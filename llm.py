from langchain.chat_models import ChatOpenAI
from email_data import get_email_data
from calender_data import get_calender_data
import re

import psycopg2

# Basic connection details
conn = psycopg2.connect(
    dbname="hackathon",
    user="postgres",
    password="12345",
    host="localhost",
    port="5432"  # default port for PostgreSQL
)

# Create a cursor
cur = conn.cursor()

# Example: Run a query
cur.execute("SELECT version();")
print(cur.fetchone())

# Initialize your model
llm = ChatOpenAI(model_name="gpt-4o", temperature=0)

# ----------- Normal simple functions ------------

def classify_priority(sender, subject, body, manager_emails, subordinate_emails):
    try:
        prompt = f"""
        You are an email priority classifier.

        Given:
        - Sender: {sender}
        - Subject: {subject}
        - Body: {body}
        - Manager Emails: {manager_emails}
        - Subordinate Emails: {subordinate_emails}

        Rules:
        1. If sender is in manager_emails → HIGH
        2. If sender is in subordinate_emails → LOW
        3. If subject/body marked High Importance → HIGH
        4. Routine daily connect → MEDIUM
        5. Otherwise, decide based on content.

        Return exactly one word: High, Medium, or Low.
        """
        print("inside llm")
        response = llm.invoke(prompt)
        return response.content.strip()
    except Exception as e:
        return f"Priority Classification Error: {e}"

def extract_todos(body):
    try:
        prompt = f"""
        You are a To-Do Extractor.

        Given this email body:
        "{body}"

        Extract action items in JSON list format. Each item should have:
        - "task"
        - "reason"

        """
        response = llm.invoke(prompt)
        print(response)
        return response.content.strip()
    except Exception as e:
        return f"To-Do Extraction Error: {e}"

def classify_approval(subject, body):
    try:
        prompt = f"""
        You are an approval classifier.

        Given:
        - Subject: {subject}
        - Body: {body}

        Classify the request into one of:
        - REVIEW (money/charges involved)
        - APPROVE (access/accounts/software)
        - REJECT (spam/external)

        Return exactly one of these three.
        """
        response = llm.invoke(prompt)
        return response.content.strip()
    except Exception as e:
        return f"Approval Classification Error: {e}"

def find_right_poc(mail_subject):
    try:
        prompt = f"""
        You are a smart email router.

        Email subject:
        "{mail_subject}"

        Choose the most appropriate contact:
        - Accounts and Billing → accounts@zs.com
        - Staffing and Employment → avneet@zs.com
        - Technical Support → support@zs.com
        - Engineering → engineering@zs.com
        - Product Management → product@zs.com
        - Business Development → bizdev@zs.com
        - Legal and Compliance → legal@zs.com
        - General Queries → support@zs.com
        - VRT, Assist → deepshika@zs.com
        - Coach.ai → kushal@zs.com

        Return just the email address.
        """
        response = llm.invoke(prompt)
        return response.content.strip()
    except Exception as e:
        return f"Routing Error: {e}"

def weekly_insights(events_json):
    try:
        prompt = f"""
        You are a weekly meeting insights analyst.

        Here are the past week's events in JSON:
        {events_json}

        Analyze and produce:
        - Total meeting time
        - Rarely attended recurring invites
        - Missed meetings
        - Free slots suggested in office hours

        Return a structured markdown summary.
        """
        response = llm.invoke(prompt)
        return response.content.strip()
    except Exception as e:
        return f"Weekly Insights Error: {e}"

def summarize_meeting(transcript):
    try:
        prompt = f"""
        You are a meeting summarizer.

        Given this transcript:
        {transcript}

        Generate:
        - 3 bullet point summary
        - Sentiment analysis (positive/neutral/negative)
        - Action items (if any)

        Return neatly in markdown.
        """
        response = llm.invoke(prompt)
        return response.content.strip()
    except Exception as e:
        return f"Meeting Summarization Error: {e}"


def removing_unwanted_text(text):
    pattern = r'json(.*?)'

    match = re.search(pattern, text, re.DOTALL)

    if match:
        text = match.group(1).strip()

    return text


# async def llm_tasks():
calender_data = get_calender_data()
email_data = get_email_data()
for email in email_data:
    priority = classify_priority(
        sender=email["sender_name"],
        subject=email["subject"],
        body=email["body"],
        manager_emails="boss@example.com",
        subordinate_emails="intern@example.com"
    )
    # print(priority)
    email["priority"]= priority


    todos = extract_todos(email["body"])
    email["todos"]=removing_unwanted_text(todos)
    # print(todos)
    #
    approval = classify_approval(email["subject"],email["body"])
    email["apporval"]=approval
    # print(approval)
    #
    poc = find_right_poc(email["subject"])
    email["poc"]=poc
    print(poc)
    cur.execute("""
                INSERT INTO outlook_messages (subject, mail_id, body, message_type, received_or_start_time)
                VALUES (%s, %s, %s, %s, %s)
            """, (email["subject"], email["sender_email"], email["body"],"email", email["received_time"]))
    conn.commit()

print(email_data[0])

cur.close()



        # weekly_summary = weekly_insights(
        #     '{"events": [{"subject": "Team Sync", "start": "2025-04-24T10:00", "end": "2025-04-24T11:00"}]}')
        # print(weekly_summary)
        #
        # meeting_summary = summarize_meeting("Today we discussed project deadlines and assigned next sprint tasks.")
        # print(meeting_summary)

