#include <stdio.h>
#include <iostream>
using namespace std;
#include<vector>



int pow (int n) {
    int ans = 1;
    while(n >= 1){
       ans = ans * pow(n);
       n--;
    }
    return ans;
}

int main(){
    
    double x = 2.00000;
    int n = 10;

    int xxx = pow(n);
    cout<<"XXX"<<xxx;

}