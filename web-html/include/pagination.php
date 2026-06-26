<?php if ($totalPages > 1): ?>
<div class="d-flex justify-content-center align-items-center gap-2 mt-4">
  <a class="btn btn-outline-dark btn-sm <?php echo $currentPage === 1 ? 'disabled' : ''; ?>" href="?page=<?php echo $currentPage - 1; ?>">
    <i class="bi bi-chevron-left"></i>
  </a>

  <?php for ($p = 1; $p <= $totalPages; $p++): ?>
    <a class="btn btn-sm <?php echo $p === $currentPage ? 'btn-dark' : 'btn-outline-dark'; ?>" href="?page=<?php echo $p; ?>">
      <?php echo $p; ?>
    </a>
  <?php endfor; ?>

  <a class="btn btn-outline-dark btn-sm <?php echo $currentPage === $totalPages ? 'disabled' : ''; ?>" href="?page=<?php echo $currentPage + 1; ?>">
    <i class="bi bi-chevron-right"></i>
  </a>
</div>
<?php endif; ?>
