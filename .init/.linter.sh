#!/bin/bash
cd /home/kavia/workspace/code-generation/poll-engagement-analytics-system-20124-20135/polls_analytics_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

