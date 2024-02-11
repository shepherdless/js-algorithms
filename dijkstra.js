// A simple JavaScript implementation of Dijkstra's algorithm
// Based on https://medium.com/@05.ankitarora/implementing-dijkstras-algorithm-in-javascript-af57c6bb3afd

// Define a class for the graph
class Graph {
  constructor() {
    this.nodes = new Map(); // A map of node names to adjacency lists
  }

  // Add a node to the graph
  addNode(node) {
    this.nodes.set(node, []);
  }

  // Add an edge between two nodes with a given weight
  addEdge(node1, node2, weight) {
    this.nodes.get(node1).push({ node: node2, weight });
    this.nodes.get(node2).push({ node: node1, weight });
  }

  // Find the shortest path from startNode to endNode using Dijkstra's algorithm
  dijkstra(startNode, endNode) {
    const distances = new Map(); // A map of node names to their distances from the start node
    const previous = new Map(); // A map of node names to their previous nodes in the shortest path
    const priorityQueue = new PriorityQueue(); // A priority queue of nodes to visit

    // Initialize the distances and the priority queue
    for (const node of this.nodes.keys()) {
      distances.set(node, node === startNode ? 0 : Infinity); // Set the distance to 0 for the start node and infinity for others
      priorityQueue.enqueue(node, distances.get(node)); // Add the node to the priority queue with its distance as priority
      previous.set(node, null); // Set the previous node to null for all nodes
    }

    // Loop until the priority queue is empty
    while (!priorityQueue.isEmpty()) {
      const currentNode = priorityQueue.dequeue(); // Get the node with the lowest priority (distance)

      if (currentNode === endNode) {
        // We have reached the destination node
        // Reconstruct the shortest path by following the previous nodes
        const path = [];
        let current = endNode;
        while (current !== null) {
          path.unshift(current); // Add the current node to the beginning of the path
          current = previous.get(current); // Move to the previous node
        }
        return path; // Return the shortest path
      }

      // Get the neighbors of the current node
      const neighbors = this.nodes.get(currentNode);

      // Loop through the neighbors
      for (const neighbor of neighbors) {
        // Calculate the distance to the neighbor through the current node
        const newDistance = distances.get(currentNode) + neighbor.weight;

        // If the new distance is smaller than the old distance
        if (newDistance < distances.get(neighbor.node)) {
          // Update the distance, the previous node, and the priority queue
          distances.set(neighbor.node, newDistance);
          previous.set(neighbor.node, currentNode);
          priorityQueue.enqueue(neighbor.node, newDistance);
        }
      }
    }

    return null; // No path found
  }
}

// Define a class for the priority queue
class PriorityQueue {
  constructor() {
    this.items = []; // An array of items with their priorities
  }

  // Add an item to the queue with a given priority
  enqueue(item, priority) {
    this.items.push({ item, priority }); // Push the item to the end of the array
    this.items.sort((a, b) => a.priority - b.priority); // Sort the array by priority in ascending order
  }

  // Remove and return the item with the lowest priority
  dequeue() {
    return this.items.shift().item; // Shift the first item of the array
  }

  // Check if the queue is empty
  isEmpty() {
    return this.items.length === 0;
  }
}