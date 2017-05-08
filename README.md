# A Very Simple Example of User Authentication Using Express and Pg-promise - Check plain username and password

1. Users submit sign up and log in forms via POST request.
2. Express handles routes. Inside post routes, use pg-promise to connect to postgres database.
3. Simply check user accounts information in user_account table in postgres and compare information by simple SQL queries.

## Notes About Password Security
* Passwords should never be stored encrypted since if you lose the key, they will be decrypted and reverted back to plain text
* They should be salted and hashed
* Hashing is one-way process
* MD5 or SHA1 are checksum algorithms -> with dramatic increase in processing speed of hackers -> these methods are no longer sufficiently secure (they are vulnerable with GPU attack)
* Even if you use salt, if you use a general purpose hash function designed for speed -> it's not secure to store passwords
* Brycpt is a slow hash function -> you can balance your choice of comparison speed and security 