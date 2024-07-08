# Repro for issue 7417

## Versions

firebase-tools v13.13.0<br>
platform: macOS Sonoma 14.5<br>
node: v20.12.2<br>
Google Cloud SDK 483.0.0<br>
bq 2.1.6<br>
cloud-firestore-emulator 1.19.7<br>
core 2024.06.28<br>
gcloud-crc32c 1.0.0<br>
gsutil 5.30

## Steps to reproduce

1. Run `gcloud emulators firestore start --database-mode=datastore-mode --host-port="127.0.0.1:7079"`
2. Open a new terminal an run `node addReview.js`
   - Note: Feel free to run this multiple times to keep adding random reviews
3. Run `node expressServer.js`
4. Open "http://localhost:8081/api/reviews" or run `curl http://localhost:8081/api/reviews`
   - Outputs a JSON:

```json
[
  {
    "submittedAt": "2024-07-08T17:46:47.692Z",
    "submitter": "Alice",
    "review": "Looks good!"
  },
  {
    "submittedAt": "2024-07-08T17:46:43.667Z",
    "submitter": "Alice",
    "review": "Well done!"
  }
]
```
