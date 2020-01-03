#!/bin/bash

curl -d "temperature=23.2&pressure=10.0" -X POST http://localhost:9000/api/user
