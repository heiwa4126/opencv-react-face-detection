#!/bin/sh -ue
curl -vi "https://$(terraform output -raw primary_web_host)"
