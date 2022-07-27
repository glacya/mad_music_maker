export function show_sheet(json){
    var result = `\`\`\`abc\nX: 1\nM: ${json.rhythm}\nK: C\n`
    const count = json.rhythm[0]
    const length = json.rhythm[2]
    var index = 0
    console.log(json.notes.length);
    if(json.notes.length>0){
        for(let i=0;i<json.notes.length;){
            if(i%16==0){
                result += '|'
            }
            
            if(json.notes[index].start == i){
                result += '[';
                while(json.notes.length>index && json.notes[index].start == i){
                    result += `${to_abc(json.notes[index].pitch)}${json.notes[index].length}/2`
                    index += 1;
                }
                result += ']'
                i += json.notes[index-1].length;
            }else{
                result += `z${(json.notes[index].start - i)}/2`
                i = json.notes[index].start;
            }
        }
    }
    result += "||"
    result += "\n\`\`\`"
    console.log(result)
    return result
}

function to_abc(pitch){
    switch(pitch)
    {
        case 0:
            return "C"
            break;
        case 1:
            return "^C"
            break;
        case 2:
            return "D"
            break;
        case 3:
            return "^D"
            break;
        case 4:
            return "E"
            break;
        case 5:
            return "F"
            break;
        case 6:
            return "^F"
            break;
        case 7:
            return "G"
            break;
        case 8:
            return "^G"
            break;
        case 9:
            return "A"
            break;
        case 10:
            return "^A"
            break;
        case 11:
            return "B"
            break;
        case 12:
            return "c"
            break;
        case 13:
            return "^c"
            break;
        case 14:
            return "d"
            break;
        case 15:
            return "^d"
            break;
        case 16:
            return "e"
            break;
        case 17:
            return "f"
            break;
        case 18:
            return "^f"
            break;
        case 19:
            return "g"
            break;
        case 20:
            return "^g"
            break;
        case 21:
            return "a"
            break;
        case 22:
            return "^a"
            break;
        case 23:
            return "b"
            break;
        case 24:
            return "c'"
            break;
        default:
            break;
    }
}