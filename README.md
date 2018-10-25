# Create-User-LamdaFunction-dynamodb

Each of the Table has new file in the source.
User is the main table.
Email and Name tables are created to make the values unique and much more quick and easy.
Connects to Dynamodb using npm module dynamodb.


1: Initially it creates an user with given credentials (name and email is mandatory)
2: If a new User is created with same name and email then 'user already exist' error is thrown.
