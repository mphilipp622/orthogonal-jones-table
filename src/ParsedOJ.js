const pattern = /([BULRDN]*)[_]*(\d)[_](\d{4})/;

export class ParsedOJ {
    
    constructor(originalString) {
        this.originalString = originalString;
        this.numUp = 0;
        this.numDown = 0;
        this.numLeft = 0;
        this.numRight = 0;
        this.numBuffer = 0;
        this.numFrames = 0;
        this.numNeutral = 0;
        this.numDirectionChanges = 0;
        this.height = 0;
        
        const match = originalString.match(pattern);
        if (match) {
            const letters = match[1];
            this.numFrames = match[2];
            this.height = match[3];

            // Parse letters
            const letterCounts = {
                'B': 0,
                'N': 0,
                'U': 0,
                'D': 0,
                'L': 0,
                'R': 0
            };

            let previousLetter = '~';
            for (const letter of letters) {
                letterCounts[letter] += 1;

                if (previousLetter !== '~' && previousLetter !== letter) {
                    this.numDirectionChanges += 1;
                }

                previousLetter = letter;
            }

            this.numUp = letterCounts['U'];
            this.numDown = letterCounts['D'];
            this.numLeft = letterCounts['L'];
            this.numRight = letterCounts['R'];
            this.numBuffer = letterCounts['B'];
            this.numNeutral = letterCounts['N'];
        } else {
            throw new Error(`Unable to parse ${originalString}`);
        }
    }

    Print() {
        console.log(`Original String = ${this.originalString}`);
        console.log(`# Up = ${this.numUp}`);
        console.log(`# Down = ${this.numDown}`);
        console.log(`# Left = ${this.numLeft}`);
        console.log(`# Right = ${this.numRight}`);
        console.log(`# Neutral = ${this.numNeutral}`);
        console.log(`# Buffers = ${this.numBuffer}`);
        console.log(`# Direction Changes = ${this.numDirectionChanges}`);
        console.log(`frames = ${this.numFrames}`);
        console.log(`height = ${this.height}`);
    }
    
    GetTableData(){
        return{
            id: this.originalString,
            originalString: this.originalString,
            numDirectionChanges: this.numDirectionChanges,
            numFrames: this.numFrames,
            height: this.height,
            numUp: this.numUp,
            numDown: this.numDown,
            numLeft: this.numLeft,
            numRight: this.numRight,
            numNeutral: this.numNeutral,
            numBuffer: this.numBuffer
        }
    }
}