import jwt
from datetime import datetime, timedelta, timezone

secret_key="sukulent"

def encodeToken(logged_in_user):
    expTime = datetime.now(tz=timezone.utc) + timedelta(days=3) 
    payload_data={
        "uid":logged_in_user["localId"],
        "mail":logged_in_user["email"],
        "exp":expTime
    }
    token=jwt.encode(
        payload=payload_data,
        key=secret_key,
        algorithm='HS256'
    )
    return token

def decodeToken(token):
    try:
        decode_token = jwt.decode(token,secret_key, algorithms=['HS256'])
        return True
    except jwt.ExpiredSignatureError:
        return False
    except jwt.InvalidTokenError:
        return False
    except:
        return False
                

