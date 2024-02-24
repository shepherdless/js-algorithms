// Define the graph as an adjacency list
let graph = [
  [1, 2], // neighbors of node 0
  [0, 3, 4], // neighbors of node 1
  [0, 5], // neighbors of node 2
  [1, 6], // neighbors of node 3
  [1, 7], // neighbors of node 4
  [2, 8], // neighbors of node 5
  [3, 9], // neighbors of node 6
  [4, 10], // neighbors of node 7
  [5, 11], // neighbors of node 8
  [6], // neighbors of node 9
  [7], // neighbors of node 10
  [8] // neighbors of node 11
];

// Define the starting node and the target node
let start = 0;
let target = 11;

// Initialize the queue, the visited set, the distance map, and the previous map
let queue = [start]; // enqueue the starting node
let visited = {}; // mark the starting node as visited
visited[start] = true;
let distance = {}; // set the distance of the starting node to 0
distance[start] = 0;
let previous = {}; // set the previous node of the starting node to null
previous[start] = null;

// Perform BFS until the queue is empty or the target is found
while (queue.length > 0) {
  // Dequeue the first node from the queue
  let node = queue.shift();

  // Check if the node is the target
  if (node === target) {
    // We have found the target, so we can stop the loop
    break;
  }

  // Loop through the neighbors of the node
  for (let neighbor of graph[node]) {
    // Check if the neighbor has not been visited
    if (!visited[neighbor]) {
      // Enqueue the neighbor to the queue
      queue.push(neighbor);

      // Mark the neighbor as visited
      visited[neighbor] = true;

      // Set the distance of the neighbor to the distance of the node plus 1
      distance[neighbor] = distance[node] + 1;

      // Set the previous node of the neighbor to the node
      previous[neighbor] = node;
    }
  }
}

// Check if the target was found
if (visited[target]) {
  // The target was found, so we can reconstruct the shortest path
  let path = [target]; // start with the target
  let node = target; // set the current node to the target
  while (node !== start) {
    // Loop until we reach the start
    node = previous[node]; // set the current node to the previous node
    path.unshift(node); // add the current node to the beginning of the path
  }
  // Print the shortest path
  console.log("The shortest path from " + start + " to " + target + " is: " + path.join(" -> "));
} else {
  // The target was not found, so we can print a message
  console.log("There is no path from " + start + " to " + target);
}