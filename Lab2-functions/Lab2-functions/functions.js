'''import math


class Shape:
    def __init__(self, color):
        self.__color=color
    def __str__(self):
        return self.__color

class Circle(Shape):
        def __init__(self, color, radius,stile,line_thichness,corners, opacity):
            super().__init__(color)
            self.__radius = radius
            self.__stile = stile
            self.__line_thichness = line_thichness
            self.__corners=corners
            self.__opacity = opacity
        def __str__(self):
                return f'Circle with radius {self.__radius} and color {self.__color} {self.__stile } { self.__line_thichness}'
        def area (self):
            return (self.__radius * self.__radius)
        def perimeter (self):
            return (self.__radius * 2)
        def __eq__(self,other):
            return self.__color == other.__color
        def __ne__(self,other):
            return self.__color != other.__color
        def __gt__(self,other):
            return self.__color > other.__color
        def __ge__(self,other):
            return self.__color >= other.__color
        def __le__(self,other):
            return self.__color <= other.__color
        def __lt__(self,other):
            return self.__color < other.__color
        def __add__(self,other):
class Rectangle(Shape):
    def __init__(self,color,width,height,stile,line_thichness,corners,opacity):
        super().__init__(color)
        self.__width = width
        self.__height = height
        self.__stile = stile
        self.__line_thichness = line_thichness
        self.__corners=corners
        self.__opacity = opacity
    def area (self):
            return (self.__width * self.__height )
    def perimeter (self):
            return ((self.__width + self.__height) *2 )
class Triangle (Shape):
    def __init__(self,color,side1,side2,side3,stile,line_thichness,corners,opacity):
        super().__init__(color)
        self.__side1 = side1
        self.__side2 = side2
        self.__side3 = side3
        self.__stile = stile
        self.__line_thichness = line_thichness
        self.__corners=corners
        self.__opacity = opacity
    def __str__(self):
        return f'{self.__side1},{self.__side2},{self.__side3},{self.stile},{self.line_thichness},{self.corners},{self.opacity}'

    def area (self):
       s = (self.__side1  + self.__side2   + self.__side3 ) / 2
        area = math.sqrt(s * (s - self.__side1) * (s -self.__side2 ) * (s - self.__side3))
       return area
    def perimeter (self):
           return = (self.__side1 + self.__side2 + self.__side3)
def total_area(shapes):
    total = 0
    for shape in shapes:
        total += shape.area()
    return total''''''

'''
from turtle import *
import math
class Shape:
    """Базовий клас для геометричних фігур."""
    def __init__(self, color):
        self.__color = color

    def __str__(self):
        return f"Color: {self.__color}"

    @property
    def color(self):
        return self.__color


class Circle(Shape):
    """Клас для представлення кола."""
    def __init__(self, color, radius, style, line_thickness, corners, opacity):
        super().__init__(color)
        self.__radius = radius
        self.__style = style
        self.__line_thickness = line_thickness
        self.__corners = corners
        self.__opacity = opacity

    @property
    def radius(self):
        return self.__radius

    @property
    def style(self):
        return self.__style

    def area(self):
        """Обчислює площу кола."""
        return math.pi * self.__radius ** 2

    def perimeter(self):
        """Обчислює периметр кола."""
        return 2 * math.pi * self.__radius

    def __str__(self):
        return f"Circle(radius={self.radius}, style={self.style}, {super().__str__()})"

    def __eq__(self, other):
        if not isinstance(other, Shape):
            return NotImplemented
        return self.area() == other.area()

    def __lt__(self, other):
        if not isinstance(other, Shape):
            return NotImplemented
        return self.area() < other.area()

    def __gt__(self, other):
        if not isinstance(other, Shape):
            return NotImplemented
        return self.area() > other.area()


circle(30)
speed(0.0002)
width(1)
ht()
right(90)
forward(25)

write("circle")




class Rectangle(Shape):
    """Клас для представлення прямокутника."""
    def __init__(self, color, width, height, style, line_thickness, corners, opacity):
        super().__init__(color)
        self.__width = width
        self.__height = height
        self.__style = style
        self.__line_thickness = line_thickness
        self.__corners = corners
        self.__opacity = opacity

    @property
    def width(self):
        return self.__width

    @property
    def height(self):
        return self.__height

    @property
    def style(self):
        return self.__style

    def area(self):
        """Обчислює площу прямокутника."""
        return self.__width * self.__height

    def perimeter(self):
        """Обчислює периметр прямокутника."""
        return 2 * (self.__width + self.__height)

    def __str__(self):
        return f"Rectangle(width={self.width}, height={self.height}, style={self.style}, {super().__str__()})"

    def __eq__(self, other):
        if not isinstance(other, Shape):
            return NotImplemented
        return self.area() == other.area()

    def __lt__(self, other):
        if not isinstance(other, Shape):
            return NotImplemented
        return self.area() < other.area()

    def __gt__(self, other):
        if not isinstance(other, Shape):
            return NotImplemented
        return self.area() > other.area()


class Triangle(Shape):
    """Клас для представлення трикутника."""
    def __init__(self, color, side1, side2, side3, style, line_thickness, corners, opacity):
        super().__init__(color)
        # Перевірка нерівності трикутника
        if not (side1 + side2 > side3 and side2 + side3 > side1 and side1 + side3 > side2):
            raise ValueError("Неможливо створити трикутник із заданими сторонами")
        self.__side1 = side1
        self.__side2 = side2
        self.__side3 = side3
        self.__style = style
        self.__line_thickness = line_thickness # Не використовується
        self.__corners = corners # Не використовується
        self.__opacity = opacity # Не використовується

    @property
    def side1(self):
        return self.__side1

    @property
    def side2(self):
        return self.__side2

    @property
    def side3(self):
        return self.__side3

    @property
    def style(self):
        return self.__style

    def area(self):
        """Обчислює площу трикутника за формулою Герона."""
        s = (self.__side1 + self.__side2 + self.__side3) / 2
        area_expr = s * (s - self.__side1) * (s - self.__side2) * (s - self.__side3)
        return math.sqrt(area_expr) if area_expr > 0 else 0

    def perimeter(self):
        """Обчислює периметр трикутника."""
        return self.__side1 + self.__side2 + self.__side3

    def __str__(self):
        return f"Triangle(sides=({self.side1}, {self.side2}, {self.side3}), style={self.style}, {super().__str__()})"

    def __eq__(self, other):
        if not isinstance(other, Shape):
            return NotImplemented
        return self.area() == other.area()

    def __lt__(self, other):
        if not isinstance(other, Shape):
            return NotImplemented
        return self.area() < other.area()

    def __gt__(self, other):
        if not isinstance(other, Shape):
            return NotImplemented
        return self.area() > other.area()


def total_area(shapes):
    """Обчислює сумарну площу всіх фігур у списку."""
    return sum(shape.area() for shape in shapes)


circle = Circle("red", 30, "solid", 1, 0, 0.9)
rectangle = Rectangle("blue", 4, 5, "dashed", 2, 4, 0.8)
triangle = Triangle("green", 3, 4, 5, "solid", 1, 3, 1.0)
print("Cписок фігур:")
print(circle)
print(rectangle)
print(triangle)
shapes = [circle, rectangle, triangle]
print("Площа усіх фігур:", total_area(shapes))
print(circle > rectangle) # Порівняння площі
print(rectangle < triangle) # Порівняння площі

