from langchain_core.tools import tool
import pandas as pd
from langchain.prompts import PromptTemplate
# from ..model import model
# from outlook.mail_fun import forward_email
from langchain_openai import AzureChatOpenAI
from langchain_openai import AzureOpenAIEmbeddings
import os
# from langchain.chat_models import ChatOpenAI
from langchain_openai import ChatOpenAI, OpenAIEmbeddings


#Setup the LLM
# model = AzureChatOpenAI(
#     azure_deployment="gpt-4o" ,
#     api_version="2023-03-15-preview",
#     model="gpt-4o"
# )

# print(os.environ["AZURE_OPENAI_API_KEY"])

product_orders_df = pd.read_csv("data/Laptop Orders.csv")

@tool
def get_order_details(order_id:str) -> str :
    """
    This function returns details about a laptop order, given an order ID
    It performs an exact match between the input order id and available order ids
    If a match is found, it returns products (laptops) ordered, quantity ordered and delivery date.
    If there is NO match found, it returns -1
    """
    #Filter Dataframe for order ID
    match_order_df = product_orders_df[
                        product_orders_df["Order ID"] == order_id ]

    #Check if a record was found, if not return -1
    if len(match_order_df) == 0 :
        return -1
    else:
        return match_order_df.iloc[0].to_dict()
    

@tool
def update_quantity(order_id:str, new_quantity:int) -> bool :
    """
    This function updates the quantity of products ( laptops ) ordered for a given order Id.
    It there are no matching orders, it returns False.
    """
    #Find if matching record exists
    match_order_df = product_orders_df[
                        product_orders_df["Order ID"] == order_id ]

    #Check if a record was found, if not return -1
    if len(match_order_df) == 0 :
        return -1
    else:
        product_orders_df.loc[
            product_orders_df["Order ID"] == order_id, 
                "Quantity Ordered"] = new_quantity
        return True
    

routing_prompt = PromptTemplate.from_template("""
You are an intelligent assistant that routes incoming emails to the right department based on the subject line.

Here is a list of departments and their corresponding emails:
- Accounts and Billing → accounts@zs.com
- Staffing, Employment → avneet@zs.com
- Technical Support → support@zs.com
- Engineering → engineering@zs.com
- Product Management → product@zs.com
- Business Development → bizdev@zs.com
- Legal and Compliance → legal@zs.com
- General Queries → support@zs.com
- VRT, Assiss -> deepshika@zs.com
- Coach.ai -> kushal@zs.com 

Given the subject: "{subject}", which department email should this be forwarded to? Just return the email.
""")

@tool
def find_right_poc_of_mail(mail_subject) -> str :
    """
    This function returns the correct email address to forward an incoming email based on its subject line using an AI model.
    """
    prompt = routing_prompt.format(subject=mail_subject)
    response = model.predict(prompt)
    print(f"email with {mail_subject} POC is - {response}")
    poc_email = response.strip()
    # forward_email(poc_email)

# find_right_poc_of_mail("Help me with new staffing in node.js for Linda Project")

@tool
def todo_list(mail_subject) -> str:
    """
    This function returns 
    """