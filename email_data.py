import win32com.client
from datetime import datetime, timedelta



def safe_get(item, attr, default="N/A"):
    try:
        return getattr(item, attr)
    except:
        return default


async def get_email_data():
    # Access Inbox
    inbox = outlook.GetDefaultFolder(6)  # 6 = Inbox
    messages = inbox.Items
    messages.Sort("[ReceivedTime]", True)  # Newest first
    print("📬 Reading Inbox Emails...\n")
    email_data = {}
    count = 1  # Unique key for each message

    for msg in list(messages):  # Limiting to 10 for demo
        try:
            subject = safe_get(msg, 'Subject')
            sender_name = safe_get(msg, 'SenderName')
            sender_email = safe_get(msg, 'SenderEmailAddress')
            to = safe_get(msg, 'To')
            cc = safe_get(msg, 'CC')
            bcc = safe_get(msg, 'BCC')
            body = safe_get(msg, 'Body')[:300]  # First 300 characters
            importance = safe_get(msg, 'Importance')  # 0=Low, 1=Normal, 2=High
            unread = safe_get(msg, 'Unread')  # True/False
            received_time = safe_get(msg, 'ReceivedTime')
            sent_on = safe_get(msg, 'SentOn')
            conversation_id = safe_get(msg, 'ConversationID')
            attachments = safe_get(msg, 'Attachments')
            attachment_names = []

            if attachments != "N/A":
                for i in range(1, attachments.Count + 1):
                    attachment = attachments.Item(i)
                    attachment_names.append(attachment.FileName)

            email_data[count] = {
                "Subject": subject,
                "From": f"{sender_name} <{sender_email}>",
                "To": to,
                "CC": cc,
                "BCC": bcc,
                "Body": body,
                "Importance": importance,
                "Unread": unread,
                "ReceivedTime": received_time,
                "SentOn": sent_on,
                "ConversationID": conversation_id,
                "Attachments": attachment_names if attachment_names else None
            }
            # print(email_data)
            count += 1
            return email_data
        except Exception as e:
            print(f"⚠️ Skipping a message due to error: {e}")

