import { Component } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

  enviarInmueble(): void{
      this.router.navigate(['/inmuebles/registro']);
    }

  constructor(private router: Router) { }

  public lineChartData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'],
    datasets: [
      {
        label: 'Fideicomisos',
        data: [200, 700, 850, 999, 1100, 1200, 1300, 1000],
        fill: true,
        borderColor: '#124ba9',
        backgroundColor: 'rgba(18, 75, 169, 0.1)',
        tension: 0.4,
        pointBackgroundColor: '#124ba9'
      }
    ]
  };

  public lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 100 }
      }
    }
  };


  // Doughnut
  public doughnutChartData = {
    labels: ['Habitacional', 'Comercial', 'Industrial'],
    datasets: [
      {
        data: [45, 30, 25],
        backgroundColor: ['#124ba9', '#16803c', '#b32828']
      }
    ]
  };

  public doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' as const }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 100 }
      }
    }
  };

  // Pie
  public pieChartData = {
    labels: ['Uso Habitacional', 'Uso Comercial'],
    datasets: [
      {
        data: [65, 35],
        backgroundColor: ['#1e40af', '#16a34a']
      }
    ]
  };

  public pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' as const }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 100 }
      }
    }
  };

  // Radar
  public radarChartData = {
    labels: ['Presupuesto', 'Ejercido', 'Disponibilidad', 'Rentas', 'Donaciones'],
    datasets: [
      {
        label: '2024',
        data: [80, 70, 60, 75, 50],
        fill: true,
        backgroundColor: 'rgba(18, 75, 169, 0.2)',
        borderColor: '#124ba9',
        pointBackgroundColor: '#124ba9'
      }
    ]
  };


  public radarChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 100 }
      }
    }
  };



}
