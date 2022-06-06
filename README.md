# gh-app-access-token-action
Use this module to get a GitHub App's access token. This can be useful in automation wherever a personal access token would normally be used (but does not currently work with GitHub's package registry). We decided it was best to use our own action here, rather than third party, because it deals with handling secrets. This action would be a fine candidate to publish to the marketplace (recommending that people fork it, for the same reason we don't use marketplace actions for this)

Suggested usage for workflow chaining:
```
      - name: Get GitHub App installation access token
        id: access_token
        uses: vivantehealth/gh-app-access-token-action/@main
        with:
          app-id: 141210
          installation-id: 19791482
          private-key: ${{ secrets.GH_WORKFLOW_CHAINING_PRIVATE_KEY }}
      - uses: actions/github-script@v6
        with:
          github-token: ${{ steps.access_token.outputs.token }}
          script: |
            await github.rest.actions.createWorkflowDispatch({
              owner: 'vivantehealth',
              repo: "downstream-repo",
              workflow_id: 'tools.yml',
              ref: 'main'
            })"
```

Suggested usage for reading private go packages
```
      - name: Get GitHub App installation access token
        id: access_token
        uses: vivantehealth/gh-app-access-token-action/@v0
        with:
          app-id: 205255
          installation-id: 26038368
          private-key: ${{ secrets.GO_PACKAGE_READER_PRIVATE_KEY }}
      - name: Granting private modules access
        run: |
         git config --global url."https://x-access-token:${{ steps.access_token.outputs.token }}@github.com/vivantehealth".insteadOf "https://github.com/vivantehealth"
```

Suggested usage for reading private php packages
```
      - name: Get GitHub App installation access token
        id: access_token
        uses: vivantehealth/gh-app-access-token-action/@v0
        with:
          app-id: 208089
          installation-id: 26293597
          private-key: ${{ secrets.PHP_PACKAGE_READER_PRIVATE_KEY }}
      - name: Granting private modules access
        run: |
         git config --global url."https://x-access-token:${{ steps.access_token.outputs.token }}@github.com/vivantehealth".insteadOf "https://github.com/vivantehealth"
```


Suggested usage for reading private terraform modules
```
      - name: Get GitHub App installation access token
        id: access_token
        uses: vivantehealth/gh-app-access-token-action/@v0
        with:
          app-id: 208275
          installation-id: 26306144
          private-key: ${{ secrets.TERRAFORM_MODULE_READER_PRIVATE_KEY }}
      - name: Granting private modules access
        run: |
         git config --global url."https://x-access-token:${{ steps.access_token.outputs.token }}@github.com/vivantehealth".insteadOf "https://github.com/vivantehealth"
```
