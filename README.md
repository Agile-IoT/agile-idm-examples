#AGILE IDM Examples

This repository contains a set of examples to interact with AGILE IDM (available here: https://github.com/Agile-IoT/agile-idm-web-ui).

AGILE IDM is an Oauth2 server that implements the following grant flows:

* authorization code: a web application obtains an authorization code after the user has logged in, and afterwards it executes calls (directly from server side) to exchange the authorization for an access token. In this flow, the browser does not access the access token, making it the most secure approach.
* implicit: a web application obtains the token after the user has logged in. In this case, the browser will obtain the token directly. In this case, the server neither requires to  execute server side code to exchange codes for tokens nor to execute server side code to authenticate itself. Although this approach can be easier to implement, there is an additional risk since the browser obtains the token.
* client credentials: this grant flow allows an application (without user interaction or web interface) to obtain an access token by providing the client id and its credentials.

The folders within this repository include several examples to illustrate applications using the different kind of authentication grants. Further, in the case of the authorization code grant, a complete application generating requests to AGILE IDM to register entities, groups, update attributes etc is also provided.
