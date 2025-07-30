#!/bin/bash
cd /home/kavia/workspace/code-generation/patient-care-management-system-10292-10301/patient_log_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

