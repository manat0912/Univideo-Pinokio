module.exports = {
  requires: {
    bundle: "ai",
  },
  env: [
    {
      key: "UniVideo_TOKEN",
      title: "Huggingface Token (KlingTeam/UniVideo)",
      description: "Place_Token_Here",
      host: "huggingface.co"
    }
  ],
  run: [
    // Edit this step to customize the git repository to use
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://huggingface.co/KlingTeam/UniVideo app",
        ]
      }
    },
    // Edit this step with your custom install commands
    {
      method: "shell.run",
      params: {
        venv: "env",                // Edit this to customize the venv folder path
        path: "app",                // Edit this to customize the path to start the shell from
        message: [
          "uv tool install hf",
          "git xet install",
          "hf download KlingTeam/UniVideo --repo-type=space",
          "uv pip install gradio devicetorch",
          "uv pip install -r requirements.txt"
        ]
      }
    },
    // Delete this step if your project does not use torch
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",                // Edit this to customize the venv folder path
          path: "app",                // Edit this to customize the path to start the shell from
          flashattention: true,   // uncomment this line if your project requires flashattention
          xformers: true,   // uncomment this line if your project requires xformers
          triton: true,   // uncomment this line if your project requires triton
          sageattention: true   // uncomment this line if your project requires sageattention
        }
      }
    },
  ]
}
