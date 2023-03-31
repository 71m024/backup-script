#!/bin/sh

strategy=("1D" "2D" "3D" "1W" "2W" "1M" "2M" "3M" "6M" "1Y" "2Y" "3Y" "10Y")
assigned=()

mkdir ./backups/`date +%Y-%m-%d`

datediff () {
    local d1=$(date -d "$1" +%s)
    local d2=$(date -d "$2" +%s)
    echo $(( (d1 - d2) / 86400 )) days
}

function intervalsToDays {
  local strategy=("$@")
  local days=()
  
  for interval in "${strategy[@]}"
  do
    case "${interval: -1}" in
      D) days+=( "${interval%?}" ) ;;
      W) days+=( $(( ${interval%?} * 7 )) ) ;;
      M) days+=( $(( ${interval%?} * 30 )) ) ;;
      Y) days+=( $(( ${interval%?} * 365 )) ) ;;
    esac
  done
  
  echo "${days[@]}"
}

days=($(intervalsToDays "${strategy[@]}"))

for slot in "${days[@]}"
do
	closestBackup=day[0]
	smallestDifference=36500
	for dir in backups/*
	do
	    backup="${dir##*/}"
	    if [ $smallestDifference -gt $(datediff $(date +%Y-%m-%d) $backup) ]
	    then
	    	closestBackup=$backup
	    fi
	done
	echo $closestBackup
done
