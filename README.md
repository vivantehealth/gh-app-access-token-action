# gh-app-access-token-action
Use this module to get a GitHub App's access token. This can be useful in automation wherever a personal access token would normally be used (but does not currently work with GitHub's package registry). We decided it was best to use our own action here, rather than third party, because it deals with handling secrets. This action would be a fine candidate to publish to the marketplace (recommending that people fork it, for the same reason we don't use marketplace actions for this)

Suggested usage for workflow chaining:
```
      - name: Get GitHub App installation access token
        id: access_token
        uses: vivantehealth/gh-app-access-token-action/@main
        with:
          app-id: 141210
          installation-id: 26037448
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

Suggested usage for reading private go packages (note: the github app needs to be installed for each repo where go packages are fetched)
```
      - name: Get GitHub App installation access token
        id: access_token
        uses: vivantehealth/gh-app-access-token-action/@v0
        with:
          app-id: 205255
          installation-id: 26038368
          private-key: ${{ secrets.GO_PACKAGE_READER_PRIVATE_KEY }}
      - name: Grant private modules access
        run: |
         git config --global url."https://x-access-token:${{ steps.access_token.outputs.token }}@github.com/vivantehealth".insteadOf "https://github.com/vivantehealth"
```

Suggested usage for reading private php packages (note: the github app needs to be installed for each repo where php packages are fetched)
```
      - name: Get GitHub App installation access token
        id: access_token
        uses: vivantehealth/gh-app-access-token-action/@v0
        with:
          app-id: 208089
          installation-id: 26293597
          private-key: ${{ secrets.PHP_PACKAGE_READER_PRIVATE_KEY }}
      - name: Grant private modules access
        run: |
         git config --global url."https://x-access-token:${{ steps.access_token.outputs.token }}@github.com/vivantehealth".insteadOf "https://github.com/vivantehealth"
```

Suggested usage for reading private python packages (note: the github app needs to be installed for each repo where python packages are fetched)
```
      - name: Get GitHub App installation access token
        id: access_token
        uses: vivantehealth/gh-app-access-token-action/@v0
        with:
          app-id: 283084
          installation-id: 33266564
          private-key: ${{ secrets.PYTHON_PACKAGE_READER_PRIVATE_KEY }}
      - name: Grant private package access
        run: |
          git config --global url."https://x-access-token:${{ steps.access_token.outputs.token }}@github.com/vivantehealth".insteadOf "https://github.com/vivantehealth"
```

Suggested usage for reading private terraform modules (this is built into terraform-stack-workflow. note: the github app needs to be installed for each repo where terraform modules are fetched)
```
    - name: Get GitHub App installation access token
      id: access_token
      uses: vivantehealth/gh-app-access-token-action/@v0
      with:
        app-id: 208275
        installation-id: 26306144
        private-key: ${{ inputs.tf_module_reader_private_key }}
    - name: Grant private modules access
      run: |
        git config --global url."https://x-access-token:${{ steps.access_token.outputs.token }}@github.com/vivantehealth".insteadOf "https://github.com/vivantehealth"
```

And then access the module as usual

```
module "name_of_module" {
  source = "github.com/vivantehealth/some-private-tf-module?ref=v0"
  ...
}
```


Suggested usage for issue automation (such as the actions in github.com/vivantehealth/zi)
```
      - name: Get GitHub App installation access token
        id: access_token
        uses: vivantehealth/gh-app-access-token-action/@main
        with:
          app-id: 280535
          installation-id: 33038019
          private-key: ${{ secrets.GH_ISSUE_AUTOMATION_PRIVATE_KEY }}
      - uses: actions/add-to-project@v0.4.0
        with:
          project-url: https://github.com/orgs/vivantehealth/projects/9
          github-token: ${{ steps.access_token.outputs.token }}
          labeled: access-control, security-exceptions, onboarding, offboarding
          label-operator: OR
```

