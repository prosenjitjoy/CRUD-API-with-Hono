create-arango:
	podman run --name arango -e ARANGO_NO_AUTH=1 -p 8529:8529 -d arangodb

delete-arango:
	podman rm -f arango
	podman volume prune

uuid:
	cat /proc/sys/kernel/random/uuid

.PHONY: create-arango delete-arango uuid