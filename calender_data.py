import win32com.client
from datetime import datetime, timedelta


def safe_get(item, attr, default="N/A"):
    try:
        return getattr(item, attr)
    except:
        return default

async def get_calender_data():
    outlook = win32com.client.Dispatch("Outlook.Application").GetNamespace("MAPI")

    # Access Calendar
    calendar = outlook.GetDefaultFolder(9)  # 9 = Calendar
    appointments = calendar.Items
    appointments.Sort("[Start]")
    appointments.IncludeRecurrences = True

    # Define last week's date range
    today = datetime.now()
    start_date = today - timedelta(days=today.weekday() + 7)  # Start of last week (Monday)
    end_date = start_date + timedelta(days=7)  # End of last week (Sunday)

    # Format dates for Outlook restriction
    start_str = start_date.strftime("%m/%d/%Y %H:%M %p")
    end_str = end_date.strftime("%m/%d/%Y %H:%M %p")

    # Restrict to last week's appointments
    restriction = f"[Start] >= '{start_str}' AND [Start] < '{end_str}'"
    restricted_items = appointments.Restrict(restriction)


    print(f"📅 Reading calendar appointments from {start_str} to {end_str}...\n")
    calendar_data = {}
    count = 1  # Used as a unique key

    for appt in list(restricted_items):
        try:
            subject = safe_get(appt, 'Subject')
            start = safe_get(appt, 'Start')
            end = safe_get(appt, 'End')
            location = safe_get(appt, 'Location')
            duration = safe_get(appt, 'Duration')
            organizer = safe_get(appt, 'Organizer')
            required_attendees = safe_get(appt, 'RequiredAttendees')
            optional_attendees = safe_get(appt, 'OptionalAttendees')
            all_day_event = safe_get(appt, 'AllDayEvent')
            busy_status = safe_get(appt, 'BusyStatus')
            categories = safe_get(appt, 'Categories')
            is_recurring = safe_get(appt, 'IsRecurring')
            reminder_before_start = safe_get(appt, 'ReminderMinutesBeforeStart')
            body = safe_get(appt, 'Body')

            calendar_data[count] = {
                "Subject": subject,
                "Start": start,
                "End": end,
                "Location": location,
                "Duration": duration,
                "Organizer": organizer,
                "RequiredAttendees": required_attendees,
                "OptionalAttendees": optional_attendees,
                "AllDayEvent": all_day_event,
                "BusyStatus": busy_status,
                "Categories": categories,
                "IsRecurring": is_recurring,
                "ReminderBeforeStart": reminder_before_start,
                "Body": body  # Limiting body content
            }
            count += 1
            # print(calendar_data)
            return calendar_data
        except Exception as e:
            print(f"⚠️ Skipping an appointment due to error: {e}")