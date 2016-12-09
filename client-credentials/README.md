#Client Credentials Example

This example shows how to create a client and authenticate using the client credentials Oauth2 flow, as per RFC 749, from an application. The main advantage offered by the client credendials flow is that an application without a web-based user interface, can still get tokens and provide them to AGILE IDM, and the AGILE framework to perform actions. However, this method does not take advantage of the external identity providers (such as google and github, webid, etc) included in AGILE IDM.

## Set up

First of all, we need to create the first user with IDM, if it not already created:
For this, execute the following command in the scripts folder of agile-idm-web-ui

```
  node createUser.js --username=bob --password=secret  --auth=agile-local
```

Afterwards an Oauth2 client must be created, make sure to provide an existing user to the createClient script.

```
node createClient.js --client=MyAgileClient2 --name="My first example as IDM client" --secret="Ultrasecretstuff" --owner=bob --auth_type=agile-local --uri=http://localhost:3002/auth/example/callback
```

## Authenticating with the Client Application

We have included a basic comman line  application that authenticates the client, and afterwards queries the client information as well as the user information.
In  case of the client credentials flow the owner of the client is represented as the user authenticated.

The sample application can be executed from a terminal to authenticate the client we just created like this:

```
node authenticateClient.js  --client MyAgileClient2  --secret Ultrasecretstuff
```

It is also possible to execute the authentication script providing additional arguments such as protocol, port, and host like this:

```
node authenticateClient.js  --client MyAgileClient2  --secret Ultrasecretstuff --host 127.0.0.1 --protocol http -- port 3000
```

## CURL

Alternatively one could authenticate a client using tools to generate http requests such as curl. 

```
curl  -X POST -u MyAgileClient2:Ultrasecretstuff -d grant_type=client_credentials http://localhost:3000/oauth2/token
```

The previous command line call would use the proper HTTP Basic authentication mechanism to authenticate the client to AGILE IDM (assuming it is running in localhost in port 3000). The expected result looks like the following:

```
{ 
  "access_token":"1A9HeY99gSYTA2o0MxIhi8pM0UVG ... rWXvrc9nqSdlj1vsEQE3INQyR0bRODEl",
  "token_type":"Bearer"
}
```

