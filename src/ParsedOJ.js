const pattern = /([BULRDN]*)[_]*(\d)[_](\d{4})/;
const patternZed = /([BULRDN]*)[_]*(\d)[_](\d{4})_([+-]?[0-9]*[.]?[0-9]+)_([+-]?[0-9]*[.]?[0-9]+)_([+-]?[0-9]*[.]?[0-9]+)_([+-]?[0-9]*[.]?[0-9]+)_([+-]?[0-9]*[.]?[0-9]+)/;

export class ParsedOJ {
    
    constructor(originalString) {
        this.originalString = originalString;
        this.numUp = 0;
        this.numDown = 0;
        this.numLeft = 0;
        this.numRight = 0;
        this.numBonk = 0;
        this.frame = 0;
        this.numNeutral = 0;
        this.numDirectionChanges = 0;
        this.height = 0;
        this.zed = [0.0, 0.0, 0.0, 0.0, 0.0];
        
        const match = originalString.match(patternZed);
        if (match) {
            const letters = match[1];
            this.numDirectionChanges = match[2];
            this.height = match[3];
            this.zed[0] = match[4];
            this.zed[1] = match[5];
            this.zed[2] = match[6];
            this.zed[3] = match[7];
            this.zed[4] = match[8];

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
            }

            this.numUp = letterCounts['U'];
            this.numDown = letterCounts['D'];
            this.numLeft = letterCounts['L'];
            this.numRight = letterCounts['R'];
            this.numBonk = letterCounts['B'];
            this.frame = this.numBonk + 1;
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
        console.log(`# Bonks = ${this.numBonk}`);
        console.log(`# Direction Changes = ${this.numDirectionChanges}`);
        console.log(`frames = ${this.numFrames}`);
        console.log(`height = ${this.height}`);
        console.log(`zed = ${this.zed}`);
    }
    
    GetTableData(){
        return{
            id: this.originalString,
            originalString: this.originalString,
            frame: this.frame,
            numDirectionChanges: this.numDirectionChanges,
            height: this.height,
            numUp: this.numUp,
            numDown: this.numDown,
            numLeft: this.numLeft,
            numRight: this.numRight,
            numNeutral: this.numNeutral,
            numBonk: this.numBonk,
            zed0: this.zed[0],
            zed1: this.zed[1],
            zed2: this.zed[2],
            zed3: this.zed[3],
            zed4: this.zed[4],
        }
    }
}