BOOKINGS=$(cat test/data/bookings.json)
CLAIMS=$(cat test/data/claims.json)

JSON_DATA=$(cat <<EOF
{
  "bookings": $BOOKINGS,
  "claims": $CLAIMS
}
EOF
)

curl -X POST http://localhost:3000/match \
  -H "Content-Type: application/json" \
  -d "$JSON_DATA" | json_pp 