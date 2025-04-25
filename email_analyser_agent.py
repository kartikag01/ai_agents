import pandas as pd
from langchain.chat_models import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.pydantic_v1 import BaseModel, Field

# --- Define Output Schema ---

class EmailAnalysis(BaseModel):
    priority: str = Field(description="Priority of the email: high, medium, low")
    relationship: str = Field(description="Sender's relationship: manager, subordinate, peer, unknown")
    tasks: list[str] = Field(description="List of tasks the user needs to do from this email")
    poc: str = Field(description="The best Point of Contact (POC) responsible for this email")

# --- Chat Model ---
# --- Parser ---

parser = JsonOutputParser(pydantic_object=EmailAnalysis)

# --- Prompt Template ---

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are an AI email assistant that analyzes emails for priority, relationship, POC, and action items."),
    ("human", """
Analyze the email below.

Sender: {sender}
Subject: {subject}
Body: {body}

My manager emails: {manager_emails}
My subordinate emails: {subordinate_emails}

{format_instructions}
""")
])

# --- Email Analysis Chain ---

chain = prompt | llm | parser

# --- Function to Analyze Each Email ---

def analyze_email(row, manager_emails, subordinate_emails):
    return chain.invoke({
        "sender": row["sender"],
        "subject": row["subject"],
        "body": row["body"],
        "manager_emails": ", ".join(manager_emails),
        "subordinate_emails": ", ".join(subordinate_emails),
        "format_instructions": parser.get_format_instructions()
    })

# --- Analyze All Emails in DataFrame ---

def analyze_email_dataframe(df: pd.DataFrame, manager_emails: list[str], subordinate_emails: list[str]):
    results = []
    for _, row in df.iterrows():
        try:
            result = analyze_email(row, manager_emails, subordinate_emails)
            results.append({
                "sender": row["sender"],
                "subject": row["subject"],
                "body": row["body"],
                **result.dict()
            })
        except Exception as e:
            results.append({
                "sender": row["sender"],
                "subject": row["subject"],
                "body": row["body"],
                "priority": "error",
                "relationship": "error",
                "tasks": [],
                "poc": f"Error: {str(e)}"
            })
    return pd.DataFrame(results)

# vikas
df = pd.DataFrame([
    {
        "sender": "boss@example.com",
        "subject": "Need approval for budget report",
        "body": "Can you approve the Q1 budget report by EOD today?"
    },
    {
        "sender": "intern@example.com",
        "subject": "Training request",
        "body": "I’d like to attend the security training next week. Can you approve this?"
    }
])

manager_emails = ["boss@example.com"]
subordinate_emails = ["intern@example.com"]

result_df = analyze_email_dataframe(df, manager_emails, subordinate_emails)
print(result_df)
