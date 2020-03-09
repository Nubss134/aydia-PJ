package com.project.web.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;

public class DateUtils {
	private static final Logger LOGGER = LoggerFactory.getLogger(DateUtils.class);

	public static String plusOneDayToDateString(String dateString) {

		try {
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy/MM/dd");

			Date dt = simpleDateFormat.parse(dateString);
			Calendar c = Calendar.getInstance();
			c.setTime(dt);
			c.add(Calendar.DATE, 1);
			return simpleDateFormat.format(c.getTime());
		} catch (ParseException e) {
			LOGGER.error("Error parse date format yyy/MM/dd", e);
			return null;
		}
	}

	public static String getCurrentDateStr(){
		LocalDateTime ldt = LocalDateTime.now();
		DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyyMMdd");
		return format.format(ldt);
	}

	public static Date getFirstDayOfCurrentWeek(){
	     Calendar c = Calendar.getInstance();
	     c.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
	     return c.getTime();
	};
	
	public static Date getLastDayOfCurrentWeek(){
	     Calendar c = Calendar.getInstance();
	     c.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
	     c.add(Calendar.DATE, 6);
	     return c.getTime();		
	}
	
	public static int getCurrentDay(){
		return LocalDate.now().getDayOfYear();
	}
	
	public static int getCurrentMonth(){
		return LocalDate.now().getMonthValue();
	}
	
	public static int getCurrentYear(){
		return LocalDate.now().getYear();
	}
	
	public static Date getFirstDayOfMonth(int month){
		Calendar c = Calendar.getInstance();
		c.set(Calendar.MONTH, month -1);
	    c.set(Calendar.DAY_OF_MONTH, 1);
	    return c.getTime();
	}

	public static Date getLastDayOfMonth(int month){
		Calendar c = Calendar.getInstance();
		c.set(Calendar.MONTH, month -1);
		c.set(Calendar.DAY_OF_MONTH, c.getActualMaximum(Calendar.DAY_OF_MONTH));
	    return c.getTime();
	}
	
	public static String getFormatedLastDayOfMonth(int month,String pattern){
		SimpleDateFormat dateFormat = new SimpleDateFormat(pattern);
		return dateFormat.format(getLastDayOfMonth(month));
	}

	public static String getFormatedFirstDayOfMonth(int month,String pattern){
		SimpleDateFormat dateFormat = new SimpleDateFormat(pattern);
		return dateFormat.format(getFirstDayOfMonth(month));
	}
	
	public static void main(String[] args) throws Exception{

		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");

		String dateStr = "2018/08/01";

		Date date = dateFormat.parse(dateStr);

		System.out.println(date);

		Calendar time = toCalendar(date);
		time.add(Calendar.DATE, -12);

		System.out.println(dateFormat.format(time.getTime()));
	}

	public static Calendar toCalendar(Date date) {
		if (date == null)
			return null;

		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		return calendar;
	}


}
