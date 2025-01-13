/* Class that models a file directory
*  root - the file directory. Uses key - value pairs to represent nested file structure.
*/
class FileDirectory {
  constructor () {
    this.root = {};
  }

  /* Function that creates directories.
  *  Takes directory to be created as input variable directory.
  */
  create (directory) {
    const parts = directory.split('/');
    let current = this.root;
    for (const part of parts) {
      if (!current[part]) {
        current[part] = {};
      }
      current = current[part];
    }
    console.log(`CREATE ${directory}`);
  }

  /* Function that deletes directories.
  *  Takes directory to be deleted as input variable directory.
  *  Prints an Error message if directory to be deleted does not exist.
  */
  delete (directory) {
    const parts = directory.split('/');
    let current = this.root;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) {
        console.log(`Cannot delete ${directory} - ${parts[i]} does not exist`);
        return;
      }
      current = current[parts[i]];
    }

    if (current[parts[parts.length - 1]]) {
      delete current[parts[parts.length - 1]];
      console.log(`DELETE ${directory}`);
    } else {
      console.log(
        `Cannot delete ${directory} - ${parts[parts.length - 1]} does not exist`
      );
    }
  }

  /* Function that moves directories.
  *  Takes source directory as input variable source.
  *  Takes destination directory as input variable destination.
  *  Prints an Error message if destination or source do not exist.
  */
  move (source, destination) {
    const sourceParts = source.split('/');
    const destParts = destination.split('/');

    let current = this.root
    for (let j = 0; j < destParts.length - 1; j++) {
      if (!current[destParts[j]]) {
        console.log(`Cannot move to ${destination} - ${destParts[j]} does not exist`);
        return;
      }
      current = current[destParts[j]];
    }
    const targetDirectory = destParts[destParts.length - 1];
    if (!current[targetDirectory]) {
      console.log(`Cannot move ${destination} - ${destParts[0]} does not exist`);
      return;
    }

    current = this.root
    for (let i = 0; i < sourceParts.length - 1; i++) {
      if (!current[sourceParts[i]]) {
        console.log(`Cannot move ${source} - ${sourceParts[i]} does not exist`);
        return;
      }
      current = current[sourceParts[i]];
    }

    const directoryToMove = sourceParts[sourceParts.length - 1];
    if (!current[directoryToMove]) {
      console.log(`Cannot move ${source} - ${sourceParts[0]} does not exist`);
      return;
    }

    const copiedDirectory = current[directoryToMove];
    delete current[directoryToMove];
    let destCurrent = this.root;
    for (const part of destParts) {
      if (!destCurrent[part]) {
        destCurrent[part] = {};
      }
      destCurrent = destCurrent[part];
    }

    destCurrent[directoryToMove] = copiedDirectory;
    console.log(`MOVE ${source} ${destination}`);
  }

  /* Function that prints full fire directory.
  *  Takes a file directory object as an input variable.
  *  Takes the indent level as an input variable.
  *  Runs recursively to print child directories with increased indent.
  *  Size of indent is controlled by INDENT_SIZE const declared outside of the class.
  */
  list (current = this.root, indent = 0) {
    if (indent === 0) console.log('LIST');
    const keys = Object.keys(current).sort();
    for (const key of keys) {
      console.log(INDENT_SIZE.repeat(indent) + key);
      this.list(current[key], indent + 1);
    }
  }

  /* Function that processes commands.
  *  Reads input from commands input variable.
  *  Runs corresponding command function if valid command found.
  *  Prints an Error message if invalid command found.
  */
  processCommands (commands) {
    for (const command of commands) {
      const parts = command.split(' ');
      if (parts[0] === 'CREATE') {
        this.create(parts[1]);
      } else if (parts[0] === 'DELETE') {
        this.delete(parts[1]);
      } else if (parts[0] === 'MOVE') {
        this.move(parts[1], parts[2]);
      } else if (parts[0] === 'LIST') {
        this.list();
      } else if (parts[0] === 'HELP') {
        this.printHelp();
      } else {
        console.log(
          `${parts[0]} is not a valid command. Please see README or type HELP for valid commands (type 'EXIT' to quit):`
        );
      }
    }
  }

  /* Function that prompts user for manual input.
  *  Reads input from command line.
  *  Terminates on command 'EXIT'.
  */
  promptForCommands () {
    process.stdin.setEncoding('utf8');
    console.log("Enter commands (type 'EXIT' to quit):");

    process.stdin.on('data', data => {
      const commands = data.trim().split('\n');
      for (const command of commands) {
        if (command === 'EXIT') {
          console.log('Exiting...')
          process.stdin.pause();
          return
        } else {
          this.processCommands([command.trim()]);
        }
      }
    })
  }

  // Function that prints help message
  printHelp() {
    console.log("This is the list of valid manual commands: ");
    for (const command of VALID_COMMANDS){
      console.log(command);
    }
    console.log("Consult the README for additional information");
  }
}

// Size of an indent
const INDENT_SIZE = '  ';

// List of valid commands
const VALID_COMMANDS = [
  'CREATE: Creates a new directory',
  'MOVE: Moves a directory and all of its child directories to another location',
  'DELETE: Deletes a directory and all of its child directories',
  'LIST: Displays the full structure of the directory',
  'EXIT: Terminates the application'
]

// Input commands to be run
const COMMANDS_LIST = [
  'CREATE fruits',
  'CREATE vegetables',
  'CREATE grains',
  'CREATE fruits/apples',
  'CREATE fruits/apples/fuji',
  'LIST',
  'CREATE grains/squash',
  'MOVE grains/squash vegetables',
  'CREATE foods',
  'MOVE grains foods',
  'MOVE fruits foods',
  'MOVE vegetables foods',
  'LIST',
  'DELETE fruits/apples',
  'DELETE foods/fruits/apples',
  'LIST'
];

// Process commands array
const directory = new FileDirectory();
directory.processCommands(COMMANDS_LIST);
// Prompt for new commands
directory.promptForCommands();
