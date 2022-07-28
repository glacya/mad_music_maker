export function show_sheet(json){
    var result = `\`\`\`abc\nX: 1\nM: ${json.rhythm}\nK: C\n`
    const count = json.rhythm[0]
    const length = json.rhythm[2]
    var index = 0
    
    // console.log("note 수:" +json.notes.length);
    // console.log("총 길이: "+json.length);
    if(json.notes.length>0){
        const total_length = json.notes[json.notes.length-1].start + json.notes[json.notes.length-1].length;
        // console.log("TOTAL LENGTH"+total_length)
        var bar = 0
        for(let i=0;i<total_length;){ // 
            if(i==bar){ 
                result += '|'
            }
            if(index < json.notes.length){
                if(json.notes[index].start == i){
                    result += '[';
                    while(json.notes.length>index && json.notes[index].start == i){
                        result += `${to_abc(json.notes[index].pitch)}${json.notes[index].length}/2`
                        index += 1;
                    }
                    result += ']'
                    
                    if(i+json.notes[index-1].length>bar+4*count){
                        bar += 4*count;
                        // console.log("#########" + bar)
                        result += '|'
                    }else if(i+json.notes[index-1].length==bar+4*count){
                        bar += 4 * count;
                        // console.log("###########" + bar)
                    }
                    
                    i += json.notes[index-1].length;
                    
                }else{
                    result += `z${(json.notes[index].start - i)}/2`
                    //if(i+json.notes[index-1]>bar+4*count)
                    if(json.notes[index].start>bar+4*count){
                        bar += 4*count;
                        result += '|'
                    }else if(json.notes[index].start==bar+4*count){
                        bar += 4 * count;
                    }
                    i = json.notes[index].start;
                    
                }
            }
        }
    }
    result += "||"
    result += "\n\`\`\`"
    // console.log("####### parse 결과: "+ result)
    return result
}

function to_abc(pitch){
    switch(pitch)
    {
        case 0:
            return "C"
        case 1:
            return "^C"
        case 2:
            return "D"
        case 3:
            return "^D"
        case 4:
            return "E"
        case 5:
            return "F"
        case 6:
            return "^F"
        case 7:
            return "G"
        case 8:
            return "^G"
        case 9:
            return "A"
        case 10:
            return "^A"
        case 11:
            return "B"
        case 12:
            return "c"
        case 13:
            return "^c"
        case 14:
            return "d"
        case 15:
            return "^d"
        case 16:
            return "e"
        case 17:
            return "f"
        case 18:
            return "^f"
        case 19:
            return "g"
        case 20:
            return "^g"
        case 21:
            return "a"
        case 22:
            return "^a"
        case 23:
            return "b"
        case 24:
            return "c'"
        default:
            break;
    }
}