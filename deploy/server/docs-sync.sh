#!/bin/sh
# Bring /opt/javarouters/docs-site to the latest commit of origin/deploy.
# Installed on the VPS as /opt/javarouters/docs-sync.sh and run by javarouters-docs-sync.timer.
# Docs content (site/, mcp/pages.json) is picked up without restarts. When the MCP server bundle
# itself changes, the javarouters-docs-mcp container is restarted so it runs the new code.
set -eu

DIR=/opt/javarouters/docs-site
MCP_CONTAINER=javarouters-docs-mcp

bundle_hash() {
	sha256sum "$DIR/mcp/server.mjs" 2>/dev/null | cut -c1-64 || true
}

before=$(bundle_hash)
git -C "$DIR" fetch --quiet --depth 1 origin deploy
git -C "$DIR" reset --quiet --hard FETCH_HEAD
git -C "$DIR" clean --quiet -fdx
after=$(bundle_hash)

if [ "$before" != "$after" ] && [ -n "$(docker ps -q --filter "name=^${MCP_CONTAINER}\$")" ]; then
	docker restart "$MCP_CONTAINER" >/dev/null
	echo "MCP server bundle changed; restarted $MCP_CONTAINER"
fi
