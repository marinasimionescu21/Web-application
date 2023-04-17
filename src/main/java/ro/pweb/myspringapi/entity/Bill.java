package ro.pweb.myspringapi.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "bill")
public class Bill {
    @Id
    @SequenceGenerator(name = "bill_sequence", allocationSize = 1)
    @GeneratedValue(generator = "bill_sequence", strategy = GenerationType.SEQUENCE)
    private int id;

    private double amount;

    @OneToMany(mappedBy = "billId")
    private List<Contract> contracts;

    public Bill() {
    }

    public Bill(int id, double amount, List<Contract> contracts) {
        this.id = id;
        this.amount = amount;
        this.contracts = contracts;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public List<Contract> getContracts() {
        return contracts;
    }

    public void setContracts(List<Contract> contracts) {
        this.contracts = contracts;
    }
}
