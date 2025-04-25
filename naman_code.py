import os
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_google_genai import GoogleGenerativeAI
from langchain.agents import AgentType, initialize_agent
from langchain.tools import Tool
from langchain.memory import ConversationBufferMemory
from google import genai
os.environ["GOOGLE_API_KEY"] = 'AIzaSyBSem9EbL2M_8U0ml1JLgl9R6H1pssZdqE'

llm = GoogleGenerativeAI(model="gemini-2.0-flash", temperature=0.7)
 
def dummy_tool(input_text):
    return f"Processed input: {input_text}"
 
tools = [Tool(name="DummyTool",func=dummy_tool,description="A test tool that processes input."),]
memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
agent = initialize_agent(tools=tools,llm=llm,agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,verbose=True,memory=memory)
query = "What is the Capital of France?"
response = agent.run(query)
print(response)