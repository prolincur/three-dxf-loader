BUMP ?= auto

.PHONY: version release

# Bump version, update CHANGELOG.md, commit and tag locally (BUMP=auto|patch|minor|major)
version:
	@git diff --quiet && git diff --cached --quiet || { echo "Working tree not clean" >&2; exit 1; }
	@[ "$$(git rev-parse --abbrev-ref HEAD)" = main ] || { echo "Release from main only" >&2; exit 1; }
	git pull --ff-only
	@if [ "$(BUMP)" = auto ]; then pnpm release; else pnpm release:$(BUMP); fi

# Push the release commit and tag, then publish the GitHub Release (triggers release.yml)
release: version
	git push --follow-tags
	v=v$$(node -p "require('./package.json').version"); \
	gh release create "$$v" --title "$$v" --generate-notes --verify-tag
