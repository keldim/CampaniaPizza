package com.chrisyoo.campaniapizzaserver.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

//@Entity
//@Table(name="pizza_veggie")
public class PizzaVeggie {

//	@Id
//	@GeneratedValue(strategy=GenerationType.IDENTITY)
//	@Column(name="id")
//	private int id;
//	
//	@OneToOne(mappedBy="veggie", cascade= {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
//	private Pizza pizza;
//	
//	@Column(name="bell_peppers")
//	private boolean BellPeppers;
//	
//	@Column(name="black_olives")
//	private boolean BlackOlives;
//	
//	@Column(name="fresh_tomatoes")
//	private boolean FreshTomatoes;
//	
//	@Column(name="chopped_garlic")
//	private boolean ChoppedGarlic;
//	
//	@Column(name="fresh_basil")
//	private boolean FreshBasil;
//	
//	@Column(name="jalapenos")
//	private boolean Jalapenos;
//	
//	@Column(name="pineapple")
//	private boolean Pineapple;
//	
//	@Column(name="red_onions")
//	private boolean RedOnions;
//	
//	@Column(name="red_peppers")
//	private boolean RedPeppers;
//	
//	@Column(name="broccoli")
//	private boolean Broccoli;
//	
//	@Column(name="mushrooms")
//	private boolean Mushrooms;
//	
//	@Column(name="sun_dried_tomatoes")
//	private boolean SunDriedTomatoes;
//	
//	@Column(name="kalamata_olives")
//	private boolean KalamataOlives;
//
//	@Column(name="spinach")
//	private boolean Spinach;
//	
//	@Column(name="banana_peppers")
//	private boolean BananaPeppers;
//	
//	private String[] itemNames = {"Bell Peppers", "Black Olives", "Fresh Tomatoes", "Chopped Garlic", "Fresh Basil", "Jalapenos", "Pineapple", "Red Onions", 
//			"Red Peppers", "Broccoli", "Mushrooms", "Sun-Dried Tomatoes", "Kalamata Olives", "Spinach", "Banana Peppers"};
//	private String[] methodNames = {"setBellPeppers", "setBlackOlives", "setFreshTomatoes", "setChoppedGarlic", "setFreshBasil", "setJalapenos", "setPineapple", "setRedOnions", 
//			"setRedPeppers", "setBroccoli", "setMushrooms", "setSunDriedTomatoes", "setKalamataOlives", "setSpinach", "setBananaPeppers"};
//	
//	public PizzaVeggie() {
//		
//	}
//
//	public PizzaVeggie(boolean bellPeppers, boolean blackOlives, boolean freshTomatoes, boolean choppedGarlic,
//			boolean freshBasil, boolean jalapenos, boolean pineapple, boolean redOnions, boolean redPeppers, boolean broccoli,
//			boolean mushrooms, boolean sunDriedTomatoes, boolean kalamataOlives, boolean spinach, boolean bananaPeppers) {
//		BellPeppers = bellPeppers;
//		BlackOlives = blackOlives;
//		FreshTomatoes = freshTomatoes;
//		ChoppedGarlic = choppedGarlic;
//		FreshBasil = freshBasil;
//		Jalapenos = jalapenos;
//		Pineapple = pineapple;
//		RedOnions = redOnions;
//		RedPeppers = redPeppers;
//		Broccoli = broccoli;
//		Mushrooms = mushrooms;
//		SunDriedTomatoes = sunDriedTomatoes;
//		KalamataOlives = kalamataOlives;
//		Spinach = spinach;
//		BananaPeppers = bananaPeppers;
//	}
//
//	public int getId() {
//		return id;
//	}
//
//	public void setId(int id) {
//		this.id = id;
//	}
//
//	public Pizza getPizza() {
//		return pizza;
//	}
//
//	public void setPizza(Pizza pizza) {
//		this.pizza = pizza;
//	}
//
//	public boolean getBellPeppers() {
//		return BellPeppers;
//	}
//
//	public void setBellPeppers(boolean bellPeppers) {
//		BellPeppers = bellPeppers;
//	}
//
//	public boolean getBlackOlives() {
//		return BlackOlives;
//	}
//
//	public void setBlackOlives(boolean blackOlives) {
//		BlackOlives = blackOlives;
//	}
//
//	public boolean getFreshTomatoes() {
//		return FreshTomatoes;
//	}
//
//	public void setFreshTomatoes(boolean freshTomatoes) {
//		FreshTomatoes = freshTomatoes;
//	}
//
//	public boolean getChoppedGarlic() {
//		return ChoppedGarlic;
//	}
//
//	public void setChoppedGarlic(boolean choppedGarlic) {
//		ChoppedGarlic = choppedGarlic;
//	}
//
//	public boolean getFreshBasil() {
//		return FreshBasil;
//	}
//
//	public void setFreshBasil(boolean freshBasil) {
//		FreshBasil = freshBasil;
//	}
//
//	public boolean getJalapenos() {
//		return Jalapenos;
//	}
//
//	public void setJalapenos(boolean jalapenos) {
//		Jalapenos = jalapenos;
//	}
//
//	public boolean getPineapple() {
//		return Pineapple;
//	}
//
//	public void setPineapple(boolean pineapple) {
//		Pineapple = pineapple;
//	}
//
//	public boolean getRedOnions() {
//		return RedOnions;
//	}
//
//	public void setRedOnions(boolean redOnions) {
//		RedOnions = redOnions;
//	}
//
//	public boolean getRedPeppers() {
//		return RedPeppers;
//	}
//
//	public void setRedPeppers(boolean redPeppers) {
//		RedPeppers = redPeppers;
//	}
//
//	public boolean getBroccoli() {
//		return Broccoli;
//	}
//
//	public void setBroccoli(boolean broccoli) {
//		Broccoli = broccoli;
//	}
//
//	public boolean getMushrooms() {
//		return Mushrooms;
//	}
//
//	public void setMushrooms(boolean mushrooms) {
//		Mushrooms = mushrooms;
//	}
//
//	public boolean getSunDriedTomatoes() {
//		return SunDriedTomatoes;
//	}
//
//	public void setSunDriedTomatoes(boolean sunDriedTomatoes) {
//		SunDriedTomatoes = sunDriedTomatoes;
//	}
//
//	public boolean getKalamataOlives() {
//		return KalamataOlives;
//	}
//
//	public void setKalamataOlives(boolean kalamataOlives) {
//		KalamataOlives = kalamataOlives;
//	}
//
//	public boolean getSpinach() {
//		return Spinach;
//	}
//
//	public void setSpinach(boolean spinach) {
//		Spinach = spinach;
//	}
//
//	public boolean getBananaPeppers() {
//		return BananaPeppers;
//	}
//
//	public void setBananaPeppers(boolean bananaPeppers) {
//		BananaPeppers = bananaPeppers;
//	}
//
//	public String[] getItemNames() {
//		return itemNames;
//	}
//
//	public String[] getMethodNames() {
//		return methodNames;
//	}
	
}
