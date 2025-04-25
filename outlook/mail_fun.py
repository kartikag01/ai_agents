import requests

# --- OUTLOOK FORWARD PART ---
def forward_email(message_id: str, forward_to: str, access_token: str, comment: str = ""):
    """
    Forwards an email using Microsoft Graph API.

    :param message_id: ID of the message to forward.
    :param forward_to: Email address to forward to.
    :param access_token: OAuth2 access token.
    :param comment: Optional comment to include in the forward.
    """
    endpoint = f"https://graph.microsoft.com/v1.0/me/messages/{message_id}/forward"

    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }

    data = {
        "comment": comment,
        "toRecipients": [
            {"emailAddress": {"address": forward_to}}
        ]
    }

    response = requests.post(endpoint, headers=headers, json=data)

    if response.status_code == 202:
        print("Email forwarded successfully.")
    else:
        print(f"Failed to forward email: {response.status_code} - {response.text}")