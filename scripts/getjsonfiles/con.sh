#!/bin/bash

declare -a files
files=(output/*)
pos=$(( ${#files[*]} - 1 ))
last=${files[$pos]}
echo '['
for FILE in output/*
do 
  cat $FILE
  if [[ $FILE == $last ]]
  then
     echo ']' 
     break
  else 
     echo ','
  fi 
done 


