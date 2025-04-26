from msal import PublicClientApplication

client_id = "3f44e949-d08f-4f9d-ba9c-c4fe252d0842"  # from Azure app registration
tenant_id = "4f24ccea-e8b3-4137-8075-1379171b3695"  # directory (tenant) ID
authority = f"https://login.microsoftonline.com/{tenant_id}"
scopes = ["Mail.Read", "User.Read"]

app = PublicClientApplication(client_id, authority=authority)

# First try to get a token silently (if previously logged in)
accounts = app.get_accounts()
print(accounts)
if accounts:
    result = app.acquire_token_silent(scopes, account=accounts[0])
else:
    # If no cached token, do interactive login
    result = app.acquire_token_interactive(
    scopes=scopes,
    redirect_uri="http://localhost:53000"  # Custom port you choose
)

access_token = result["access_token"]
print("Access Token:", access_token)
