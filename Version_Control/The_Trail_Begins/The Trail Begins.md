# CTF Write-up — The trail begins

## Challenge Overview
You are provided with an image file. The image serves as a hint leading you to the next stage.

-![alt text](image-4.png)


## Steps to Solve
1. **Download the image** from the CTF portal.
2. **Inspect the image** — the embedded information points to a LinkedIn profile of the user.
3. **Visit the LinkedIn page** — within the LinkedIn profile, you’ll find a reference to two separete GitHub profiles.
   > Remember the image shared has a post of where the user came from and to which organization they currently are at. This is also present on the third hint which states "_Two doors, two paths. One’s a legacy stuck in the past; the other is building something **new**. Which team would you join?_"
   >
   > The emphasis on the word **new** hints we should be interested in the organization that our guy recently joined and not where he left. In this case, the guy moved from ClearWave Labs to InvisiTech Labs; and thus InvisiTech Labs Github account is of interest to us. This is OSINT intepretation till that point.
5. **Navigate to the GitHub repository**:

```
https://github.com/InvisiTech-Labs/onboarding-pipeline.git
```

5. **Explore the repository** — inside the `docs` folder, open: `onboarding-pipeline/docs/pipeline_notes.md`

- The flag is located in `pipeline_notes.md`.

- ![alt text](image-5.png)

  > FLAG: flag{inm_pipeline_starts_here}

