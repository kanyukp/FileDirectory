# File Directory

An application that simulates hierarchical directories - a common method of organizing files on a computer.

## Description

The goal of this application is to simulate the usual file directory structure of a computer. When the application is run it generates an initial file structure based on the command array constant declared in the code. After this initial run, the user will be prompted to enter commands via the command line to change the directory by MOVING, CREATING, or DELETING folders. The user can also display their full directory structure at any time by using the LIST command. A full list of commands and their example results can be found below.

## Getting Started

### Dependencies

* node.js must be installed to run the application locally.

### Executing program

* To execute the program navigate to the directory containing the 'fileDirectory.js' file and run the command:

```
node fileDirectory.js
```

## Command List

* CREATE: Creates a new directory

Sample Input : 
```
CREATE fruits
```
Sample Output : 
```
CREATE fruits
```
* MOVE: Moves a directory and all of its child directories to another location

Sample Standard Input : 
```
MOVE grains/squash vegetables
```
Sample Output : 
```
MOVE grains/squash vegetables
```
Sample Error Input:
```
MOVE directoryDoesNotExist vegetables
```
Sample Output :
```
Cannot move directoryDoesNotExist - directoryDoesNotExist does not exist
``` 

* DELETE: Deletes a directory and all of its child directories
Sample Standard Input : 
```
DELETE grains/squash
```
Sample Output : 
```
DELETE grains/squash
```
Sample Error Input:
```
DELETE directoryDoesNotExist
```
Sample Output :
```
Cannot DELETE directoryDoesNotExist - directoryDoesNotExist does not exist
``` 
* LIST: Displays the full structure of the directory
* EXIT: Terminates the application
* HELP: Displays command list


## Version History

* 0.1
    * Initial Release
