#!/bin/bash

# Parse command line options
while [[ $# -gt 0 ]]; do
  case "$1" in
    --private-key)
      private_key="$2"
      shift
      ;;
    --host)
      host="$2"
      shift
      ;;
    --user)
      user="$2"
      shift
      ;;
    --port)
      port="$2"
      shift
      ;;
    --command)
      command="$2"
      shift
      ;;
    *)
      echo "Unknown option: $1"
      exit 1
      ;;
  esac
  shift
done

# Check required options
if [[ -z "$private_key" || -z "$host" || -z "$user" || -z "$command" ]]; then
  echo "Missing required option!"
  exit 1
fi

# Write private key to a temporary file
keyfile=$(mktemp)
echo "$private_key" > "$keyfile"
chmod 600 "$keyfile"

# Set SSH options
options="-o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null"
if [[ -n "$port" ]]; then
  options+=" -p $port"
fi

# SSH into the remote server and run the command
ssh -i "$keyfile" $options "$user@$host" "$command"

# Clean up temporary files
rm "$keyfile"
