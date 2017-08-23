/**
 * A company of dwarfs is travelling across the New Zealand. On reaching the Clutha River the dwarfs need to get across, but recent storms have washed away the bridge. Luckily, a small ferry, in the form of a square raft, is operating.

 The raft is square and has N rows of seats, numbered from 1 to N. Each row contains N seats, labeled with consecutive letters (A, B, C, etc.). Each seat is identified by a string composed of its row number followed by its column number; for example, "9C" denotes the third seat in the 9th row.

 The raft has already been loaded with barrels in some seat positions, and other seats are already occupied by dwarfs. Our company of dwarfs may only take the remaining unoccupied seats. The ferryman wants to accommodate as many dwarfs as possible, but the raft needs to be stable when making the crossing. That is, the following conditions must be satisfied:

 the front and back halves of the raft (in terms of the rows of seats) must each contain the same number of dwarfs;
 similarly, the left and right sides of the raft (in terms of the columns of seats) must each contain the same number of dwarfs.
 You do not have to worry about balancing the barrels; you can assume that their weights are negligible.

 For example, a raft of size N = 4 is shown in the following illustration:



 Barrels are marked as brown squares, and seats that are already occupied by dwarfs are labeled d.

 The positions of the barrels are given in string S. The occupied seat numbers are given in string T. The contents of the strings are separated by single spaces and may appear in any order. For example, in the diagram above, S = "1B 1C 4B 1D 2A" and T = "3B 2D".

 In this example, the ferryman can accommodate at most six more dwarfs, as indicated by the green squares in the following diagram:



 The raft is then balanced: both left and right halves have the same number of dwarfs (four), and both front and back halves have the same number of dwarfs (also four).

 Write a function:

 function solution(N, S, T);

 that, given the size of the raft N and two strings S, T that describes the positions of barrels and occupied seats, respectively, returns the maximum number of dwarfs that can fit on the raft. If it is not possible to balance the raft with dwarfs, your function should return -1.

 For instance, given N = 4, S = "1B 1C 4B 1D 2A" and T = "3B 2D", your function should return 6, as explained above.

 Assume that:

 N is an even integer within the range [2..26];
 strings S, T consist of valid seat numbers, separated with spaces;
 each seat number can appear no more than once in the strings;
 no seat number can appear in both S and T simultaneously.
 In your solution, focus on correctness. The performance of your solution will not be the focus of the assessment.
 */

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');
// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');
// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');
let tester = require('./testFrame');

let upperleft = 0, upperright = 1, lowerleft = 2, lowerright = 3;
function charToNum(c){
    return c.toUpperCase().charCodeAt(0) - 64;
}

function seatInSection(seat, mid){
    let col = charToNum(seat.substring(seat.length - 1)), row = seat.substring(0, seat.length - 1) - '0', section = 0;
    if(row > mid) section += 2;
    if(col > mid) section += 1;
    return section;
}


function solution(N, S, T) {
    function checkBalance(){
        return !(dwarfCounts[upperleft] > seatsAvailable[lowerright] ||
            dwarfCounts[lowerright] > seatsAvailable[upperleft] ||
            dwarfCounts[upperright] > seatsAvailable[lowerleft] ||
            dwarfCounts[lowerleft] > seatsAvailable[upperright]);

    }

    // write your code in JavaScript (Node.js 6.4.0)
    let sections = 4, dwarfCounts = new Array(sections), seatsAvailable = new Array(sections), mid = N / 2;
    for(let i = 0; i < sections; i++){
        dwarfCounts[i] = 0;
        seatsAvailable[i] = N * N / sections;
    }

    if(S.length > 0){
        S.split(' ').forEach(function(seat){
            seatsAvailable[seatInSection(seat, mid)]--;
        });
    }

    if(T.length > 0){
        T.split(' ').forEach(function(seat){
            let sect = seatInSection(seat, mid);
            dwarfCounts[sect]++;
        });
    }
    console.log('dawfcount :', dwarfCounts, 'seatsAvail: ',seatsAvailable);
    if(!checkBalance()){
        return -1;
    }



    return 2 * Math.min(seatsAvailable[upperleft], seatsAvailable[lowerright]) +
        2 * Math.min(seatsAvailable[upperright], seatsAvailable[lowerleft]) -
        (dwarfCounts[upperleft] + dwarfCounts[lowerright] + dwarfCounts[upperright] + dwarfCounts[lowerleft]);

}



let testcases = [
    [22,'6B 6H 4I 7G 10B 2D 8C 5G 6C 4C 7H 3G 6A 9B 2F 6I 4A 8B 4B 11G 7B 7E 9J 1B 6K 2B 7A 10F 1F 9I 4K 6E 8D 10K 9C 8F 1D 1G 10E 7J 4J 1I 7K 7D 11B 10J 6J 2C 7I 3F 11A 11D 5D 9A 7F 6D 1H 2G 10C 3C 6G 2H 5B 5K 2J 2K 8A 1E 10D 5C 5I 5H 4G 7C 1A 5J 10A 5A 3I 4H 11F 3D 9G 4D 1J 3A 8G 2E 11J 1K 8I 5F 11C 4E 6F 3E 9F 8H 3K 2I 11I 10H 8E 3J 5E 11H 3B 11E 9H 2A 8K 3H 9D 11K 9E 10I 4F 8J 1C 10G 9K 12M 18S 22T 16T 18N 13N 20O 22R 20N 13O 22U 21S 14N 13S 15R 18T 14R 17S 12Q 15Q 22O 12V 20M 19S 20Q 14M 17P 12N 14S 15O 20T 19Q 22L 22Q 12P 21P 17R 15N 17T 21Q 16O 22P 21O 13P 12T 13T 16Q 14U 16P 17N 17Q 22M 17O 21R 14O 20U 18Q 20S 13R 15T 19P 22S 15U 21M 14L 12R 14V 20L 15S 13M 17V 22N 15M 17L 19U 13U 16S 19L 18U 16N 21T 19M 19V 22V 20R 15P 12O 21L 15V 16M 21U 21V 17U 13L 14Q 16V 18R 14T 13Q 12S 19R 20P 18L 17M 16L 20V 18P 18M 19T 21N 18V 16R 19N 19O 14P 15L 18O 16U 12L 12U 13V',''],//242
    // [4,'1a 1b 2a 2b',''],
    // [2,'1a 1b 2a 2b',''],
    // [2,'','1a 1b 2a 2b'],
    [4,'1B 1C 4B 1D 2A','3B 2D'],

    [4,'1A 2B 3C 4D','1B']
    // simple_raft
    // //2 '' ''
    // //4 '' ''
    // tiny_raft
    // //4 '' ''
    // //2 '' '1B'
    // 4 '' '4D'
    // different_diagonals
    // 2 '2A' ''
    // 4 '1B 2A 4B' ''
    // unbalanced_raft contains unbalanced rafts, unable to cross the river, N
    // 4 '1B 1A 2A' '3C 4C'
    // 6 '1A 3C 3B 3A 2A 2B 1C 1B 2C' '6F'
    // medium_random randomly generated raft, N from 8 to 12
    // 8 '3G 4B 8B 7D 8G 5B 4E 1F 4C 6D' '4H 6B 3A 7H 4A 5G 3C 8D 2D 5H'
    //
    // asymmetric_raft asymmetric rafts, N from 14 to 18
    // 12 '11C 10J 9C 8I 7D 1J 12I 2K' '11D 4F 4B 3E 3J 7C 7G 1C 2C 2G 3I 9J 6G 11E 11G 2L 10L 12D 9A 10I 6J 8F 11I 12J 11A 5G 7J 3K 4E 4K'  r 102
    //18 '5P 7M 8J 2O 6R 4P 6N 4R 5M 2M 2R 9L 8N 9Q 9R 6M 9J 8R 9N 1O 7L 2K 9P 3J 3K 4M 6P 1L 8K 6L 1K 2J 4J 8O 5O 5K 2L 7Q 3L 7N 3N 4O 8P 3R 4K 6Q 7O 7P 1R 8M 2N 6J 6O 3P 3O 9K 5J 2P 9O 5N 5Q 1J 7J 7R 4Q 8L 3Q 1N 4L 7K 5R 1Q 1M 1P 5L 9M 2Q 4N 8Q 6K 3M 15H 18B 10E 16C 14A 11H 11C 13D 12E 16E 16I 10A 16G 13H 12C 13E 18A 10B 16B 15I 17B 15C 14C 10D 11I 14G 17A 12I 14D 18G 12G 10I 13F 15E 14I 18C 10H 18D 17C 17G 14B 15B 13I 14H 10C 12H 17H 18I 16H 17D 11F 12D 16D 11B 11E 15D 12B 12F 18E 16F 14F 15A 13C 13A 13B 10G 11D 17F 16A 13G 14E 18F 11A 11G 15F 18H 10F 17E 17I 12A 15G' '' r162
    //22 '6B 6H 4I 7G 10B 2D 8C 5G 6C 4C 7H 3G 6A 9B 2F 6I 4A 8B 4B 11G 7B 7E 9J 1B 6K 2B 7A 10F 1F 9I 4K 6E 8D 10K 9C 8F 1D 1G 10E 7J 4J 1I 7K 7D 11B 10J 6J 2C 7I 3F 11A 11D 5D 9A 7F 6D 1H 2G 10C 3C 6G 2H 5B 5K 2J 2K 8A 1E 10D 5C 5I 5H 4G 7C 1A 5J 10A 5A 3I 4H 11F 3D 9G 4D 1J 3A 8G 2E 11J 1K 8I 5F 11C 4E 6F 3E 9F 8H 3K 2I 11I 10H 8E 3J 5E 11H 3B 11E 9H 2A 8K 3H 9D 11K 9E 10I 4F 8J 1C 10G 9K 12M 18S 22T 16T 18N 13N 20O 22R 20N 13O 22U 21S 14N 13S 15R 18T 14R 17S 12Q 15Q 22O 12V 20M 19S 20Q 14M 17P 12N 14S 15O 20T 19Q 22L 22Q 12P 21P 17R 15N 17T 21Q 16O 22P 21O 13P 12T 13T 16Q 14U 16P 17N 17Q 22M 17O 21R 14O 20U 18Q 20S 13R 15T 19P 22S 15U 21M 14L 12R 14V 20L 15S 13M 17V 22N 15M 17L 19U 13U 16S 19L 18U 16N 21T 19M 19V 22V 20R 15P 12O 21L 15V 16M 21U 21V 17U 13L 14Q 16V 18R 14T 13Q 12S 19R 20P 18L 17M 16L 20V 18P 18M 19T 21N 18V 16R 19N 19O 14P 15L 18O 16U 12L 12U 13V' '' r 242
    //large_random randomly generated rafts, N from 20 to 24

    //20 '7C 8Q 15B 18P 9C 18S 13Q 20N 18G 20B 5Q 5D 2H 4P 1S 6R 18C 2R 16R 20R 12G 14K 3C 1C 3L 1N 6E 10F 13B 3A 3Q 5L 11K 17E 9H 11N 1D 14H 16C 7S 8P 9R 14N 17T 4I 6A 4G 18Q 19E 11I' '17S 4T 2B 14O 13D 4O 8T 4J 2N 8A 1P 6S 19B 13F 13M 15K 5P 10O 10D 12M 20F 1L 18I 20S 9A 16K 2C 6F 14I 3I 2K 14G 10R 3H 13N 4B 15R 12L 13C 6G 7N 14B 16O 13S 16E 4L 6T 4N 15G 18F 16F 14M 3P 9D 5N 19D 18E 9T 17I 4H 8K 11J 11D 11P 20I 11G 12T 19H 20K 5J 13G 14C 11C 7G 14J 13T 19A 20J 14A 20O' r266
    //24 '15F 18I 24P 1H 21X 9H 14C 15V 10T 24A 19J 23M 12J 14G 2H 12C 18D 6U 23F 19N 5W 15D 23S 4X 11T 3L 3W 21S 8F 13C 21J 16F 24R 12K 8E 22B 22D 1G 20C 23P 14F 19V 17X 1O 22F 13B 8H 24E 2X 7R 1W 16L 17H 24T 22P 1S 10C 13X 17Q 3I 13U 24B 16V 21W 20L 2U 17G 17I 6K 20B 21M 20E 9J 14X 1N 11E 12V 17U 23D 19T 16O 11N 16H 8G 15E 10X 21O 15T 20M 3V 21D 21I 20R 1E 18U 23L 17F 18C 9Q 19L 18V 9W 23J 8I 1M 15H 11F 6N 16M 18N 1P 6S 9E 8Q 9F 10K 18W 15O 22R 22T 16E 4F 4R 5V 20Q 24N 17E 23C 5E 16U 10N 5J 12T 8V 7J 11R 6A 15M 23E 8L 14A 21B 24L 20U 7P 6F 14H 24I 5B 22W 6R 15N 23G 18M 7O 5U 15W 22X 3X 13J 22Q 13R 16J 11G 7V 2I 1C 13I 5Q 2R 10D 8R 6P 3S 21A 12E 20I 3O 20W 1Q 16R 4Q 3J 19R 5F 17B 3F 13T 22C 23R 5S 24V 12G 3R 1I 22U 19Q 1J 18G 19U 12W 11Q 16X 9T 12U 9M 5R 11L 23V 9N 2N 2W 19W 19S 8D 1K 1A 14E 12A 13A 17K 7N 23X 4T 7L 19I 9C 14B 21Q 3H 10S 3N 2A 6J 10B 15B 13D 15U 3B 20K 21R 4E 24O 4U 10W 16Q 11U 1L 15S 24X 16W 22K 15X 20H 19X 3E 12O 11H 9P 18B 6B 22G 12M 3U 14T 21T 16K 5H 1X 19O 8S 1R 9U 23O 17J 20N 9O 24D 7X 22S 12H 24W 13N 18X 15R 14U 15P 17V 23B 9A 5K 10J 10Q 2G 3D 16T 20X 3G 13G 7T 23H 22A 9G 18E 24K 23W 2J 11V 15G 6E 4N 11X 23K 8U 12B 7K 7E 23U 4H 6T 14N 10R 5G 10O 13S 15K 9L 14J 3T 8J 13P 7F 8N 12D 17T 5O 17C 7Q 23Q 4V 5X 3K 16P 24H 17M 15L 18S 8K 14R 4W 2Q 19A 8O 17L 3C 16G 18T 24F 14M 15Q 21G 17S 10A 1B 23N 24J 13L 18H 4J 24S 5T 18A 6M 1T 10F 16I 21N 7M 6H 11P 2M 20F 21L 24U 4O 21V 22H 10U 11D 24Q 15I 12F 20A 15J 12N 19D 5A 4B 10L 13V 18R 20S 5N 6G 22V 21K 6I 1F 9B 13K 19B 16C 12R 17A 2V 24M 4G 24G 7W 13F 22O 12I 3M 1V 19F 11S 23A 11O 20V 19G 2P 3P 2B 7S 8P 4C 18P 2D 4D 16D 6X 11M 2E 8X 2T 2C 22N 8B 21U 7U 20J 8M 17D 21E 3Q 6C 13O 19K 18O 20O 4L 17R 14V 10V 5C 21F 18L 8T 19P 9X 11C 17N 11I 22M 8A 16N 11A 12Q 23I 4A 4P 5I 18K 17O 23T 20D 17W 14P 7C 19M 11B 22E 10I 13W 7B 2S 7G 12X 20P 8W 14O' '16S 4K 18Q 7H 17P 5M 7A 11K 11W 10E 20G 10M 10H 7D 22L' r41


//maximal_raft randomly generated rafts, N from 20 to 24

    // 26 '2A 3A 6F 8B 4B 12A 5L 8L 1C 13B 7J 1A 1D 2M 2I 9K 1L 6B 3C 13C 1H 7G 5K 6M 2K 1F 8K 8A 12C 12L 8J 5E 5D 11E 1K 9F 5C 9J 11F 6C 6H 9I 4K 10J 9L 13H 7I 11L 5J 6D 4G 13I 3M 4A 2H 4D 5F 8E 3J 9G 12B 5G 4C 3E 6L 7D 9H 10F 6A 10B 3K 7M 6J 12M 6G 2C 3F 7H 8I 13G 13M 8H 10H 9B 8F 12J 3B 4H 5M 2L 11J 8M 13J 2F 5H 4J 13A 11G 11H 10I 12H 1I 12F 10G 5B 13K 7E 11M 4I 11D 11B 4L 10D 13D 11C 10C 11K 1J 12E 10L 2D 4M 9C 9M 1E 2E 4F 1M 8C 3L 5A 3D 11A 10E 7K 12D 8G 7C 9E 12K 10M 1B 2B 4E 3H 3I 11I 7B 3G 7A 10K 2J 6K 7F 13L 6I 7L 12G 5I 6E 9D 1G 9A 2G 12I 10A 13F 13E 8D 16Z 23Y 20W 14T 19Y 25O 14X 26S 20Y 17X 21Z 23Q 26P 22T 23S 21N 21S 24S 15T 25W 17T 18R 18Z 18W 16W 20S 14S 24Z 20P 17Y 18Y 26U 23T 17N 25S 23V 16T 17W 14V 23U 14Z 25Q 14Y 15W 26O 16P 22P 22S 21P 15X 17R 19P 16V 19X 16Q 19V 22N 23X 22X 15N 15P 20N 26T 19W 25X 25Y 26Q 15O 26X 19N 23W 21V 15R 24U 25Z 25P 22Q 22U 14Q 15Z 15S 24R 26N 17Q 20Z 26V 19U 25N 24V 19R 16S 16X 21O 18P 23N 14N 21R 22R 20U 21Y 22O 15V 21U 14U 16U 14O 18T 19Q 17P 24Y 21W 25U 17Z 20O 18N 23R 24P 15U 17S 17U 24O 20Q 17O 22V 14W 22Y 15Y 19Z 17V 26Y 15Q 21X 21T 19T 18Q 24X 18O 16R 19S 14R 20X 26W 21Q 24T 26R 24N 18X 20R 24W 18V 18U 23P 23O 16Y 25T 22W 14P 23Z 25V 20V 24Q 26Z 20T 16N 25R 19O 18S 16O 22Z' '' r338

    // 26 '25Z 21Z 23U 14Y 14Q 17R 16R 15X 21P 19Z 26S 15U 21S 24O' '13C 9C 2D 5H 4M 12A 9J 3C 8C 12G 6I 2E 4K 6K 4H 8J 8H 6A 13E 5B 9B 4I 1B 6H 8K 10L 1M 8B 8L 7E 6J 2J 7A 5C 10I 11E 9G 10M 4C 2K 7J 11F 10A 4F 9E 1J 11M 9D 1C 13B 7D 9F 7F 7H 8M 6D 12L 3M 4D 7K 8D 5D 12J 13L 10E 6F 9M 6G 11G 12D 12C 9A 9K 6L 9L 5E 9H 1E 8A 6C 1F 10C 4L 2C 11J 5J 12H 1A 13J 5G 6E 7L 1I 11D 12K 5A 12B 5L 10J 13K 13M 11K 8I 2M 13G 4G 2H 1D 11I 4B 2A 10G 11C 13I 7M 7I 13F 11L 6B 10D 8G 3K 10F 5F 2G 7G 9I 3F 5I 1L 10B 6M 3I 13H 2I 8F 1G 2B 12F 3G 4E 1H 3J 3B 5K 1K 13D 2L 7C 8E 7B 10K 12M 11A 10H 3D 3A 12I 2F 3E 3H 11B 4J 5M 12E 11H 13A 4A 3L' r-1

    // 26 '' '1D 10B 19G 13K 23H 1J 7R 4V 24Y 13X 20T 19Z 21J 2F 16U 12I 20E 19N 24H 1Y 10E 20W 15D 9B 6T 7U 9N 13Z 8M 11K 10F 17M 14Y 3Z 13L 6M 7C 17D 20A 17N 15N 15R 7J 14B 13C 11N 22I 22P 23U 18N 15J 15X 22T 25L 3Q 17W 13G 7T 7F 10R 7D 16N 19E 24O 8P 26T 12B 10Q 23O 9D 13H 3V 24F 18I 24A 13R 4F 9O 4K 7E 26A 7N 10V 7L 5Y 17S 21P 24D 9L 21Y 5J 20R 15E 16F 2X 4G 15K 23G 18L 9C 9J 13O 21R 13A 18C 10P 20F 5L 15A 14U 23Y 22Z 17P 15T 15G 20N 5X 4S 6H 12P 22W 10C 4T 17Y 10Z 18A 4Z 6V 20V 7Z 19R 10H 8O 2G 18P 4O 1S 10M 22B 5H 24T 2Y 21N 20X 18Z 11Q 13B 4B 13U 3M 14N 18E 17G 26J 16T 12K 19W 2T 20H 19B 8T 5R 24P 26M 1W 9S 12A 12Z 14L 8I 21Q 3F 9Z 14S 23N 6S 19M 12M 1X 6K 4I 23X 15C 7P 2J 6I 17A 20J 24K 7B 6J 2W 4X 6F 17B 18Y 15U 2L 17H 11D 23T 23J 3W 19J 14F 8N 1C 19U 5K 23A 19O 8Y 25T 21K 8H 13W 12E 25O 22Y 1N 23L 25P 16K 4L 26K 11X 1Q 15Z 5U 21L 1I 20Q 7Q 8C 11I 16D 3L 16Q 17Z 12S 19V 17C 6L 13N 11R 5W 14J 8J 7W 1U 23E 11J 23R 12N 2N 15M 22A 4J 17Q 26S 14G 5D 7V 15Y 17F 12V 6X 22L 1K 13V 7O 24B 11V 21X 16G 12L 4H 6W 16H 16Y 19L 9Y 9H 26H 21A 24L 14H 8U 3R 18M 11C 22N 25E 15I 14X 10T 12G 24J 23I 23K 10A 25H 5N 9P 17I 10N 19X 10J 22J 6D 2U 15O 11H 15V 5C 3E 6E 11Z 25C 6O 21M 12J 21B 19A 26N 15L 18G 21F 9R 13M 18X 12C 16Z 11E 13F 24I 22G 13S 12F 3K 3H 5I 9V 14E 6R 8K 14Q 6C 8G 20O 18V 4D 2V 17E 24M 1O 25Z 2A 23Z 2P 3G 21H 24E 20L 7A 18T 18R 8Q 18F 22C 4A 16P 4Q 2S 1M 25B 25U 4N 14T 17U 26E 19I 9T 12D 9X 2H 23S 6G 24G 22Q 24Z 12W 3X 26R 5E 6Q 16R 4R 16O 5M 17J 8F 18U 26W 15B 21U 20B 8A 4M 17X 1T 3I 5Q 1P 10K 5P 25W 13Y 3S 21E 25G 3A 10L 24V 2M 20G 26Q 23V 19S 7M 7H 26V 11S 13J 16W 21I 14M 8V 23W 3C 1R 2B 3D 11W 17R 4Y 23D 24N 19C 18D 19Q 4C 3Y 14C 10W 9M 23F 5S 6Y 23B 18B 12O 5B 11Y 7G 15P 20Z 6P 23Q 15H 8B 22S 9W 8Z 13E 3T 17L 22D 22V 18H 9G 15F 19H 1E 14O 22F 16L 21T 10Y 25S 14W 3O 12R 17V 10S 10U 20M 2C 3J 8L 16A 18O 26G 23C 4P 16X 23P 26L 20K 15Q 8D 1A 26C 12Y 21V 4E 12H 4W 8W 5F 16C 5G 20D 2I 24W 22O 13D 22E 2E 20S 26F 16B 11U 24X 1H 11A 14K 21D 8X 13T 25N 1Z 14A 18W 19D 26Z 2R 25R 22R 12U 26X 9K 2D 11T 11L 13I 16M 7Y 9E 2Q r0

    //26 '8L 4S 8A 13P 26V 22B 13F 15F 5Q 2X 17G 16J 26W 7X 1H 21V 5E 22Y 11P 21S 20L 5L 7I 7L 3V 12H 9H 12I 21L 15E 14T 17R 23G 21D 15R 23T 12M 21Q 5T 16P 5R 11E 22X 25L 11M 13Y 11Y 10T 1J 18X 16U 3T 2E 25I 8F 1R 26L 18K 22N 8J 18I 23H 19U 2I 5B 14C 26Q 3A 25P 3E 19J 6J 19T 19B 4F 13E 8G 18O 20K 9X 1O 4D 5V 9D 26X 20G 14W 12D 12Q 19M 13I 11X 9O 3U 16Q 23F 25Q 8C 11K 17X 10G 6X 1F 26N 16O 9V 9Z 12E 7E 24Y 4M 4P 19I 24T 2T 1B 10Q 10W 5M 12K 9S 19Y 19V 8N 1K 24M 4Y 2Y 23W 26U 22S 10E 21J 16C 25A 17B 17I 26C 23Q 15Y 9I 20S 25B 22C 16I 25V 23R 1G 12F 17L 11J 13J 15V 2R 10H 2C 15M 18M 26A 14Q 19Z 11L 6I 5H 11U 17F 19X 25U 11D 2H 8X 5N 20R 22T 14G 26Z 13Z 6W 13O 13X 19E 19Q 16T 14O 3S 3D 25Z 13B 2A 15J 6Z 2Q 21N 26K 9M 6F 18E 26F 18W 2U 6U 12R 15Z 14S 19O 6L 6S 10J 19F 19D 3K 8B 24A 18H 2Z 19C 14F 2M 23Z 17D 14A 7R 14R 20U 7B 1U 9L 16S 24H 6G 18R 24Q 23S 10S 10K 2W 7Z 13C 14N 13A 17M 18Y 4U 7Q 3B 20Z 4L 15N 10N 11I 3L 26Y 18A 26T 4W 25S 24J 21Y 5W 24K 6O 15Q 16E 18G 24I 7A 21E 25D 7C 5P 8S 15L 3N 20I 25T 12V 5D 23P 14J 24B 8M 17U 13V 6T 12L 22D 5Z 13U 9F 24N 15T 18L 16X 11Z 12W 8W 8K 10M 16L 13K 26G 22A 18V 15P 23L 7S 22J 19L 23B 12U 25G 4C 3Y 21P 3R 16H 18B 8D 15H 1S 4R 7J 13N 18F 10Z 15W 7M 22E 2J 12B 5G 15B 17H 4Z 13R 22Z 3P 24S 18Z 18P 12X 20F 1A 6C 5X 5J 6A 22F 22V 20O 15D 21A 21O 6B 3G 7N 22P 8V 11N 2L 13D 17Y 6E 10F 3O 21H 7W 6R 25X 10X 9E 19W 25K 11V 16Z 2F 22Q 1N 11C 22G 20E 1X 26B 15A 7T 18Q 19A 9G 17N 9W 20B 21I 22W 5C 6V 10C 9Q 23Y 1Z 8Z 1C 26O 4V 23J 1E 9K 11T 26I 7D 20Y 4T 16K 18N 1V 9N 12G 8P 2V 2P 12A 16F 10I 9T 22M 12S 25N 17T 6K 8R 25Y 23K 2G 17Z 2B 21R 3C 7V 8T 14D 2D 25E 3Z 9R 24X 26D 11G 22H 24V 5I 14E 20C 7U 20P 7Y 17O 12N 10D 22R 16V 6N 15S 11A 21T 21X 24F 14V 16N 19S 4A 21M 11S 10V 18C 14M 11F 24Z 26S 11O 5K 26P 4Q 15U 16D 16Y 16B 17W 18S 6Y 10O 24D 16R 3H 24U 24L 2K 21C 24C 2S 4E 25M 17K 17C 3J 4H 14Z 10L 22L 19K 5A 24R 22K 6M 25W 15I 21G 8O 14L 17E 6D 24P 14B 17V 9P 20Q 25C 2N 13L 25O 3M 17J 1Y 15C 10B 17A 17P 16G 8H 21K 12T 14P 19N 2O 12Y 12P 19P 17Q 26R 3X 9Y 21B 1W 14Y 3F 13T 11W 15O 13M 23I 19H  r0


];
tester.run(solution, testcases);