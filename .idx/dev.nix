{ pkgs, ... }: {
  channel = "stable-23.05"; # "stable-23.05" or "unstable"
  packages = [
    pkgs.nodejs
    pkgs.nodePackages.firebase-tools
  ];
  idx.extensions = [];
  idx.previews = {
    enable = true;
    previews = [
      {
        command = ["python3" "-m" "http.server" "$PORT" "--bind" "0.0.0.0"];
        manager = "web";
        id = "web";
      }
    ];
  };
}