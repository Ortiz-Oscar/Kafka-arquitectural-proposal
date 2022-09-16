import os

def read_env_val(env_key):
    try:
        return os.environ[env_key]
    except Exception:
        print(f'Error reading environment value, key not found {env_key}')
        