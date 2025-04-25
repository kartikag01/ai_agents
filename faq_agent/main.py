from langgraph.prebuilt import create_react_agent
from langgraph.checkpoint.memory import MemorySaver
from langchain_core.messages import AIMessage,HumanMessage,SystemMessage
from .tools import get_product_features, get_laptop_price
from model import model

#Create a System prompt to provide a persona to the chatbot
system_prompt = SystemMessage("""
    You are professional chatbot that answers questions about laptops sold by your company.
    To answer questions about laptops, you will ONLY use the available tools and NOT your own memory.
    You will handle small talk and greetings by producing professional responses.
    """
)

#Create a list of tools available
tools = [get_laptop_price, get_product_features]

#Create memory across questions in a conversation (conversation memory)
checkpointer=MemorySaver()

#Create a Product QnA Agent. This is actual a graph in langGraph
product_QnA_agent=create_react_agent(
                                model=model, #LLM to use
                                tools=tools, #List of tools to use
                                state_modifier=system_prompt, #The system prompt
                                debug=False, #Debugging turned on if needed
                                checkpointer=checkpointer #For conversation memory
)