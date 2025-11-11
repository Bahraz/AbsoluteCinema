/controllers
    - przyjmuje żadania 
    - nie zawiera logiki biznesowej tylko wywołuje Facade lub Service
    - zwraca HTTP response

/services 
    - oddziela logikę biznesową od kontrolera
    - tutaj można użyć STRATEGY do cen biletów lub STATE do statusu rezerwacji

/repositories
    - Abstrakcja nad DB, łatwiej zmieniać i testować bazę danych

- 