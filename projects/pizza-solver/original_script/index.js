const f = (radius, height) => (Math.pow(radius, 2) * Math.acos((radius - height) / radius)) - ((radius - height) * Math.sqrt((2 * radius * height) - Math.pow(height, 2)))

// Circle diameter is 1 (r = 0.5).
// Percentage is given
// we need to get to total area
const r = 4;
const area = Math.PI * Math.pow(r, 2);


function getHeightFromPercentage(percent) {

    // Get the area

    const targetArea = percent * area;

    let reached = false;
    let height = 0.01;
    

    while (!reached) {
        a = f(r, height);
        // console.log(height);
        if (a > targetArea) {
            reached = true;
            break;
        }
        height = height + 0.001;
    }

    return height;
}

const solved = getHeightFromPercentage(0.33);
console.log(solved);
