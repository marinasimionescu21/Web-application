package ro.pweb.myspringapi.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "bill")
public class Bill {
    @Id
    @Column(name = "cod_bill")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int code;

    @Column(name = "amount")
    private double amount;

    @OneToMany(mappedBy = "billCode")
    private List<Contract> contracts;

    public Bill() {
    }

    public Bill(int code, double amount) {
        this.code = code;
        this.amount = amount;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }
}
