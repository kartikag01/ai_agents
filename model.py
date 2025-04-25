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
 
embedding = OpenAIEmbeddings(
    model="text-embedding-3-large",
    openai_api_version="2023-05-15",
    #  model_name="gpt-4o",
    # max_tokens=4000,
    # temperature=0.6,
    openai_api_key=openai_api_key  
)

model = ChatOpenAI(
    model_name="gpt-4o",
    max_tokens=4000,
    temperature=0.6,
    openai_api_key=openai_api_key
    )



# print(os.environ["AZURE_OPENAI_API_KEY"])