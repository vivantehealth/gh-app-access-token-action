# gh-app-access-token-action
Use this module to get a GitHub App's access token. This can be useful in automation wherever a personal access token would normally be used (but does not currently work with GitHub's package registry)

Suggested usage:
```
      - name: Get GitHub App installation access token
        id: access_token
        uses: vivantehealth/gh-app-access-token-action/@main
        with:
          app-id: 141210
          installation-id: 19791482
          private-key: ${{ secrets.GH_PACKAGE_REGISTRY_READER_PRIVATE_KEY }}
      - name: Do something in GitHub
        run: echo "masked token: ${{ steps.access_token.outputs.token }}"
```
