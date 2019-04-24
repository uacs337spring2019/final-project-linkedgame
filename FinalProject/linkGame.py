#Name: Linked Game
#Author: Shiyu Cheng
#12/26/2016

import random
import math


class Point:
    def __init__(self, name: str, x: int, y: int):
        self.__x = x
        self.__y = y
        self.__name = name

    def getx(self):
        return self.__x

    def gety(self):
        return self.__y

    def mark_empty(self):
        self.__name = " "

    def name(self):
        return self.__name

    def axis(self):
        return (self.__x, self.__y)


elements = ["@", "@", "@", "@",
            "$", "$", "$", "$",
            "%", "%", "%", "%",
            "&", "&", "&", "&",
            "*", "*", "*", "*",
            "?", "?", "?", "?",
            "M", "M", "M", "M",
            "A", "A", "A", "A",
            "W", "W", "W", "W"]

grid = [['#', '#', '#', '#', '#', '#', '#', '#'],
        ['#', '0', '0', '0', '0', '0', '0', '#'],
        ['#', '0', '0', '0', '0', '0', '0', '#'],
        ['#', '0', '0', '0', '0', '0', '0', '#'],
        ['#', '0', '0', '0', '0', '0', '0', '#'],
        ['#', '0', '0', '0', '0', '0', '0', '#'],
        ['#', '0', '0', '0', '0', '0', '0', '#'],
        ['#', '#', '#', '#', '#', '#', '#', '#']]
random.shuffle(elements)

def main():
     #for i in grid:
      #  print(i)
    #print(elements)

    replaceElement()

    grid_with_points = makeGridWithPoints()
    drawGridWithPoints(grid_with_points)
    print()

    while(1):
        p1_x = int(input('please input p1 x axis: '))
        p1_y = int(input('                y axis: '))
        p2_x = int(input('please input p2 x axis: '))
        p2_y = int(input('                y axis: '))

        p1_info = [p1_x, p1_y]
        p2_info = [p2_x, p2_y]

        p1, p2 = findPoints(grid_with_points, p1_info, p2_info)

        conditions(grid_with_points, p1, p2)
        drawGridWithPoints(grid_with_points)
        drawCurrentGrid(grid_with_points)

def drawCurrentGrid(grid_with_points):

    for i in grid_with_points:
        for j in i:
            if (j.name() != "#"):
                print(j.name(), end=" ")
        print()

def conditions(grid_with_points, p1, p2):

    if(p1.name() == p2.name()):

        check_none_corner = noneCorner(grid_with_points, p1, p2)
        if (check_none_corner == True):
            p1.mark_empty()
            p2.mark_empty()

        check_one_corner = oneCorner(grid_with_points, p1, p2)
        if (check_one_corner == True):
            p1.mark_empty()
            p2.mark_empty()

        if (check_none_corner == False) and (check_one_corner == False):
            check_two_corner = twoCorner(grid_with_points, p1, p2)
            if(check_two_corner == True):
                p1.mark_empty()
                p2.mark_empty()

        if (check_none_corner == False) and \
           (check_one_corner == False) and \
           (check_two_corner == False):
            print("This \""+p1.name()+" cannot be reached. Try again...")

    else:
        print('They are not matching, please try again...\n')

def twoCorner(grid_with_points, p1, p2):

    # searching horizontal right direction
    distance_to_right_end = len(grid_with_points) - p1.gety() - 1
    p3 = False # set p3 defult
    for i in range (1, distance_to_right_end+1):
        if grid_with_points[p1.getx()][p1.gety()+i].name() == " ":
            p3_y = p1.gety()+i
            # make p3 point
            p3 = Point(" ", p1.getx(), p3_y)
            if (oneCorner(grid_with_points, p3, p2) == True):
                return True

        elif grid_with_points[p1.getx()][p1.gety()+i].name() == "#":
            p3_y = p1.gety()+i
            # make p3 point
            p3 = Point("#", p1.getx(), p3_y)
            if (oneCorner(grid_with_points, p3, p2) == True):
                return True
        else:
            break

    # searching horizontal left direction
    distance_to_left_end = p1.gety()
    for i in range(1, distance_to_left_end+1):
        gap = p1.gety() - i
        if grid_with_points[p1.getx()][gap].name() == " ":
            # make p3 point
            p3 = Point(" ", p1.getx(), gap)
            if (oneCorner(grid_with_points, p3, p2) == True):
                return True

        elif grid_with_points[p1.getx()][gap].name() == "#":
            # make p3 point
            p3 = Point("#", p1.getx(), gap)
            if (oneCorner(grid_with_points, p3, p2) == True):
                return True
        else:
            break

    # searching vertical down direction
    distance_to_down_end = len(grid_with_points) - p1.getx() -1
    for i in range(1, distance_to_down_end+1):
        p3_x = p1.getx()+i
        if (grid_with_points[p3_x][p1.gety()].name() == " "):
            #make p3 point
            p3 = Point(" ", p3_x, p1.gety())
            if (oneCorner(grid_with_points, p3, p2) == True):
                return True

        elif (grid_with_points[p3_x][p1.gety()].name() == "#"):
            #make p3 point
            p3 = Point("#", p3_x, p1.gety())
            if (oneCorner(grid_with_points, p3, p2) == True):
                return True
        else:
            break

    #searching vertical up direction
    distance_to_up_end = p1.getx()
    for i in range(1, distance_to_up_end+1):
        gap = p1.getx() - i
        if (grid_with_points[gap][p1.gety()].name() == " "):
            # make p3 point
            p3 = Point(" ", gap, p1.gety())
            if oneCorner(grid_with_points, p3, p2) == True:
                return True

        elif (grid_with_points[gap][p1.gety()].name() == "#"):
            # make p3 point
            p3 = Point("#", gap, p1.gety())
            if oneCorner(grid_with_points, p3, p2) == True:
                return True
        else:
            break

    return False

def oneCorner(grid_with_points, p1, p2):

    # judge if it is oneCorner
    if (p1.getx() == p2.getx()) or (p1.gety() == p2.gety()):
        return False

    # test a corner point
    p3 = searchCornerPoint(grid_with_points, p1, p2)
    if (p3.name() == " ") or (p3.name() == "#"):
        if noneCorner(grid_with_points, p1, p3) == True and noneCorner(grid_with_points, p2, p3) == True:
            return True

    # test another corner point
    p3 = searchCornerPoint(grid_with_points, p2, p1)

    if (p3.name() == " ") or (p3.name() == "#"):
        if noneCorner(grid_with_points, p1, p3) == True and noneCorner(grid_with_points, p2, p3) == True:
            return True

    return False

def searchCornerPoint(grid_with_points, p1, p2):

    p3_x = p1.getx()
    p3_y = p2.gety()

    for i in grid_with_points:
        for j in i:
            if (j.getx() == p3_x) & (j.gety() == p3_y):
                return j

def noneCorner(grid_with_points, p1, p2):

    if (p1.getx() != p2.getx()) and (p1.gety() != p2.gety()):
        return False

    # vertical searching
    if (p1.getx() == p2.getx()):
        if (p1.gety() > p2.gety()):
            max_num = p1.gety()
            min_num = p2.gety()
        else:
            max_num = p2.gety()
            min_num = p1.gety()

        for i in range (min_num+1, max_num):
            if (grid_with_points[p1.getx()][i].name() != " ") and \
               (grid_with_points[p1.getx()][i].name() != "#"):
                return False

    # horizontal searching
    if (p1.gety() == p2.gety()):
        if(p1.getx() > p2.getx()):
            max_num = p1.getx()
            min_num = p2.getx()
        else:
            max_num = p2.getx()
            min_num = p1.getx()

        for i in range(min_num+1, max_num):
            print("........2")
            if (grid_with_points[i][p2.gety()].name() != " ") and \
               (grid_with_points[i][p2.gety()].name() != "#"):
                return False
    return True

def findPoints(grid_with_points, p1, p2):

    for i in grid_with_points:
        for j in i:
            if(j.getx() == p1[0]) & (j.gety() == p1[1]):
                find_p1_point = j

    for i in grid_with_points:
        for j in i:
            if(j.getx() == p2[0]) & (j.gety() == p2[1]):
                find_p2_point = j

    return find_p1_point, find_p2_point

def replaceElement():

    replace_index = 0
    for i in range(0, len(grid)):
        for j in range(0, len(grid[i])):
            if grid[i][j] == "0":
                grid[i][j] = elements[replace_index]
                replace_index += 1
            if (grid[i][j] != "#"):
                print(grid[i][j], end=" ")
        print()

def makeGridWithPoints():

    grid_with_points = [[], [], [], [], [], [], [], []]

    for i in range(0, len(grid)):
        for j in range(0, len(grid[i])):
            point = Point(grid[i][j], i, j)
            grid_with_points[i].append(point)
    return grid_with_points

def drawGridWithPoints(grid_with_points):

    for i in grid_with_points:
        for j in i:
            if (j.name() != "#"):
                print(j.name(), j.axis(), end=" ")
        print()

main()
