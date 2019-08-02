/*
There are Multinational conglomerate companies like alphabet. They have Subsidiary companies like alphabet has google and capitalG etc. These Subsidiary companies also have Subsidiary companies like google has YouTube, AdMob, Google Japan etc.
CEOs of companies need to know how much gross profit a company is making.
Gross Profit of a company is sum of gross profit of all its Subsidiariy companies and profit of that comapany. Profit of each company keeps on changing Amritesh has to help them in finding gross profit of the company.

Amritesh has the data of a Multinational conglomerate company, data will include the initial profit of each company and subsidiary compainy(s) of each company and he has to respond to 2 types of queries.

1 x y : means he has to update profit of company x to y .
2 x : means he has to output the gross profit of company x .

Amritesh is busy in preparing for ACM-ICPC. Can you help him in solving the query.

Input:

First line of the input contains two space separated integers N and Q i.e total number of companies and number of queries respectively.

For next N - 1 lines, each line contains two space separated integers a, b denoting that b is subsidiary of a

Next line contains N space separated integers denoting the initial profit of each company in order, 1 to N .

For next Q lines, each line contains a query of either type 1 or type 2.

Output:

For each query of type 2, output a single line containing an integer corresponding to answer of the query.

Constraints:

1 ≤ N ≤ 105
1 ≤ a, b ≤ N
1 ≤ Q ≤ 105
0 ≤ profit of companies ≤ 109
1 ≤ x ≤ N


SAMPLE INPUT
4 3
1 2
1 3
2 4
5 2 0 3
2 2
1 2 1
2 2

SAMPLE OUTPUT
5
4


Explanation
There is a company 1 which has subsidiary companies 2 and 3. company 2 has subsidiary company 4.

first query we have to output the gross profit of company 2. since company 4 has no subsidiary so gross profit of company 4 = profit of company = 3 so gross profit of company 2 = gross profit of company 4 + profit of company 2 = 3+2 = 5

second query profit of company 2 changes to 1

third query gross profit of company 2 = gross profit of company 4 + profit of company 2 = 3+1 = 4

All the participants need to register on the given link: Register Here

Time Limit:	1.0 sec(s) for each input file.
Memory Limit:	50000 MB
Source Limit:	1024 KB
Marking Scheme:	Marks are awarded when all the testcases pass.
 */
